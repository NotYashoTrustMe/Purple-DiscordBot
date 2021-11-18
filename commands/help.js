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
			name  : 'calculate:',
			value :
				'• Calculate an equation.\n • `-` for Substraction. `(ex. - 10 - 2 => 8)`\n • `+` for Addition. `(ex. - 10 + 2 => 12)`\n • `*` for Multiplication. `(ex. - 10 * 2 => 20)`\n • `/` for Division. `(ex. - 10 / 2 => 5)`\n • `%` for Remainder. `(ex. - 10 % 2 => 0, 10 % 3 => 1)`'
		},
		{ name: 'meme:', value: '• Get a Random Meme From Reddit (subreddit: `r/{subreddit}`)' },
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
