const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings.js');

module.exports = {
	name    : 'guildMemberRemove',
	async execute(member) {
		console.log(`${member.user.username} has left the server.`);
		const guildSettings = await GuildSettings.findOne({ guildID: member.guild.id });

		if (!guildSettings && !guildSettings.welcomeChannel) return;
		const memberChannel = member.guild.channels.cache.get(guildSettings.welcomeChannel);
		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#ff2660')
			.setTitle('Member Left 💀')
			.setDescription(`${member.user} has left the server B(\n${member.guild.memberCount} members in total`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		memberChannel.send({
			embeds : [
				memberEmbed
			]
		});
	}
};
