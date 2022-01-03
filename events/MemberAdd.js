const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings.js');

module.exports = {
	name    : 'guildMemberAdd',

	async execute(member) {
		const guildSettings = await GuildSettings.findOne({ guildID: member.guild.id });

		const memberChannel = member.guild.channels.cache.find(channel => channel.id === guildSettings.welcomeChannel);
		const generalChannel = guildSettings.generalChannel;

		if (!guildSettings || !guildSettings.welcomeChannel) return;

		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#03cafc')
			.setTitle('New Member! 🎉')
			.setDescription(
				`${member.user} is now a member of ${member.guild.name}!
				 Have a great time here, visit our <#${generalChannel}> for chats and more!`
			)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		if (!memberChannel || !generalChannel) {
			console.log('Channels not set');
			return;
		}

		await memberChannel
			.send({
				embeds : [
					memberEmbed
				]
			}).then(() => {
				console.log(`${member.user.username} has joined ${member.guild.name}`);
			}
		);
	}
};
