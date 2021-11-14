const Discord = require('discord.js');

module.exports = {
	name    : 'MemberAdd',

    async execute(member) {
        const main_channel = "893053479038357524";
        const member_channel = "909047268513038397"
        const memberEmbed = new Discord.MessageEmbed()
            .setColor("#03cafc")
            .setTitle("New Homie! 🎉")
            .setDescription(`${member.user} is now a member of Stonks! Have a great time here, go to <#${main_channel}> for chats, Thanks for Joining! Enjoy :)`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();
            
        member.guild.channels.cache.get(member_channel).send({embeds: [memberEmbed] })
	}
};
