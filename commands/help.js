const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

var Embed = new Discord.MessageEmbed()
	.setColor('#04D277')
	.setTitle('Help Commands:')
	.setDescription(
		'Your command should start with `/`. Use \\ to ignore any escape sequences. (Help Command Inspired from Python BOT)\n\u200B'
	)
	.setThumbnail('https://i.imgur.com/rNul59J.png')
	.addFields(
		{ name: 'help:', value: '• Get the list of commands' },
		{
			name  : 'quote:',
			value : '• Get a Motivational Quote'
		},
		{ name: 'meme:', value: '• Get a Random Meme From Reddit [Optional: `subreddit:` subreddit name]' },
		{ name: 'dadjoke:', value: '• Get a dad joke' },
		{ name: 'quote:', value: '• Get a Motivational Quote' },
		{ name: "setBotCommandsChannel", value: '• Set the channel for bot commands' },
		{ name: "setGeneralChannel", value: '• Set the channel for general messages' },
		{ name: "setWelcomeChannel", value: '• Set the channel for welcome messages' },
		{ name: '\u200B', value: '\u200B' }
	)
	.setTimestamp()
	.setFooter('\nPurple', 'https://i.imgur.com/NoHbJTk.png');

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
