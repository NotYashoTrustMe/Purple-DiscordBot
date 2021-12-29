const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

var Embed = new Discord.MessageEmbed()
	.setColor('#04D277')
	.setTitle('Help Commands:')
	.setDescription(
		'All the commands are slash commands, use `/`\n\u200B'
	)
	.setThumbnail('https://i.imgur.com/rNul59J.png')
	.addFields(
		{ name: 'help:', value: '• Get the list of commands' },
		{ name: 'meme:', value: '• Get a Random Meme From Reddit \n[Optional: `subreddit:` name]' },
		{ name: 'dadjoke:', value: '• Get a dad joke' },
		{ name: 'quote:', value: '• Get a Motivational Quote' },
		{ name: "set-bot-channel", value: '• Set the channel for bot commands' },
		{ name: "set-general-channel", value: '• Set the channel for general messages' },
		{ name: "set-welcome-channel", value: '• Set the channel for welcome messages' },
		{ name: '\u200B', value: '\u200B' }
	)
	.setTimestamp()
	.setFooter({ name: '\nPurple', iconURL:'https://i.imgur.com/NoHbJTk.png'});

module.exports = {
	data    : new SlashCommandBuilder().setName('help').setDescription('Get a list of available commands'),
	async execute(interaction) {
		await interaction.deferReply();
		interaction.editReply({
			embeds : [
				Embed
			]
		});
	}
};
