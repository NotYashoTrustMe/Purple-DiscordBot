const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	name    : 'MemberAdd',

	async execute(member) {
		const generalChannel = process.env.GENERAL_CHANNEL;
		const memeberChannel = process.env.MEMBER_LOG_CHANNEL;
		const memberEmbed = new Discord.MessageEmbed()
			.setColor('#03cafc')
			.setTitle('New Homie! 🎉')
			.setDescription(
				`${member.user} is now a member of Stonks! Have a great time here, go to <#${generalChannel}> for chats, Thanks for Joining! Enjoy :)`
			)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		member.guild.channels.cache.get(memeberChannel).send({
			embeds: [
				memberEmbed
			]
		});
	}
};
