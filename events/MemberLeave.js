const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings.js');

module.exports = {
	name    : 'guildMemberRemove',

	async execute(member) {
		const guildSettings = await GuildSettings.findOne({ guildID: member.guild.id });

		if (!guildSettings.welcomeChannel) return;

		const memberChannel = member.guild.channels.cache.find(
			(channel) => channel.id === guildSettings.welcomeChannel
		);
		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#ff2660')
			.setTitle('Member Left 💀')
			.setDescription(`${member.user} has left the server B(\n${member.guild.memberCount} members in total`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		if (!memberChannel) {
			console.log('Channels not set');
			return;
		}

		await memberChannel
			.send({
				embeds : [
					memberEmbed
				]
			})
			.then(() => {
				console.log(`${member.user.username} has left ${member.guild.name}`);
			});
	}
};
