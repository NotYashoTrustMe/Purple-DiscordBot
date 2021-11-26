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
			value :
				'• Get a Motivational Quote'
		},
		{ name: 'meme:', value: '• Get a Random Meme From Reddit (subreddit: `subreddit name`)' },
		{ name: '\u200B', value: '\u200B' }
	)
	.setTimestamp()
	.setFooter('\nPurple', 'https://i.imgur.com/NoHbJTk.png');

module.exports = {
	data    : new SlashCommandBuilder().setName('help').setDescription('Get a list of available commands'),
	async execute(interaction) {
		await interaction.deferReply();
		interaction.editReply({
			embeds: [
				Embed
			]
		});
	}
};
