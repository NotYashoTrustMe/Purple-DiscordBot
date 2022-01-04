const bannedList = require('../config/bannedList.json');
const MemberStats = require('../models/MemberStats.js');
module.exports = {
	name    : 'messageCreate',

	async execute(message) {
		if (message.author.bot) return;
		originalMessage = message.content;

		// TODO: FIX THIS

		var memberStats = await MemberStats.findOne({
			guildID: message.guild.id,
			userID: message.author.id
		});

		if (!memberStats) {
			memberStats = new MemberStats({
				guildID: message.guild.id,
				userID: message.author.id,
				roles: message.member.roles.cache.map(role => role.id),
				xp: 0,
				level: 1
			});
			newMemberStats.save();
		}
		else {
			memberStats.xp += 1;
			memberStats.roles = message.member.roles.cache.map(role => role.id);
			memberStats.level = Math.floor(0.1 * Math.sqrt(memberStats.xp));
			memberStats.save();
		}

		console.log(memberStats);

		// Auto MODERATION
		const banned = [];

		for (i of bannedList.words) {
			banned.push(i);
		}
		for (i of bannedList.links) {
			banned.push(i);
		}
		for (i of bannedList.otherLangs) {
			banned.push(i);
		}

		for (i of banned) {
			if (originalMessage.toLowerCase().includes(i)) {
				message.delete().catch(console.error);

				const warning = message.channel.send(`**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: \`\`\`${originalMessage}\`\`\`\n`);

				setTimeout(() => {
					warning.then((msg) => msg.delete()).catch(console.error);
				}, 5000);
				break;
			}
			else {
				continue;
			}
		}
	}
};
