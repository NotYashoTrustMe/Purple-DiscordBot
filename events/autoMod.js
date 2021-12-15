const path = require('path');
const bannedList = require(path.resolve('config/bannedList.json'));
module.exports = {
	name    : 'messageCreate',

	async execute(message) {
		if (message.author.bot) return;
		originalMessage = message.content;

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
				message.delete();
				const warningMessage = i.match(/\b(https?:\/\/\S+)/gi)
					? `**⚠️ ${message.author} has been warned for using a banned GIF**\n\nOriginal Message: ${originalMessage}\n`
					: `**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: \`\`\`${originalMessage}\`\`\`\n`;

				const warning = message.channel.send(warningMessage);

				setTimeout(() => {
					warning.then((msg) => msg.delete());
				}, 5000);
				break;
			}
		}
	}
};
