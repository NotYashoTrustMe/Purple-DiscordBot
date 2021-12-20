const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings.js');

module.exports = {
	name    : 'guildMemberAdd',

	async execute(member) {
		console.log(`${member.user.username} has joined ${member.guild.name}`);
		const guildSettings = await GuildSettings.findOne({ guildID: member.guild.id });

		if (!guildSettings && !guildSettings.welcomeChannel) return;

		const welcomeChannel = member.guild.channels.cache.get(guildSettings.welcomeChannel);
		const generalChannel = guildSettings.generalChannel;
		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#03cafc')
			.setTitle('New Member! 🎉')
			.setDescription(
				`${member.user} is now a member of ${member.guild.name}! Have a great time here, visit our <#${generalChannel}> for chats and more!`
			)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		welcomeChannel.send({
			embeds : [
				memberEmbed
			]
		});
	}
};
