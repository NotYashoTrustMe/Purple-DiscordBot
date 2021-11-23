fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data    : new SlashCommandBuilder().setName('quote').setDescription('Gets a random inspiring quote'),
	async execute(interaction) {
		await interaction.deferReply();
		const quote = await getQuote();
		var Embed = new MessageEmbed()
			.setColor('#616c99')
			.setAuthor('Type.fit - Quotes', 'https://i.imgur.com/91ECqy3.jpeg', 'https://type.fit/api/quotes')
			.setTitle('⠀⠀⠀\n' + quote['text'])
			.setDescription('~ ' + quote['author'] + '\n⠀⠀⠀');
		interaction.editReply({
			embeds: [
				Embed
			]
		});
	}
};

function choice(choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
}

let getQuote = async function() {
	const url = 'https://type.fit/api/quotes';
	const response = await fetch(url);
	const content = await response.json();
	return choice(content);
};
