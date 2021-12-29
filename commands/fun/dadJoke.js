const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data    : new SlashCommandBuilder().setName('dadjoke').setDescription(`Get a dad joke`),
	async execute(interaction) {
		await interaction.deferReply();
		const url = 'https://icanhazdadjoke.com/';
		const response = await fetch(url, {
			headers : {
				Accept : 'application/json'
			}
		});

		const embed = new MessageEmbed();

		const json = await response.json();
		if (json.joke.includes('?')) {
			const setup = json.joke.split('?')[0] + '?';
			const delivery = json.joke.split('? ')[1];
			embed
				.setColor('#ffe600')
				.setTitle(delivery ? `${setup} || ${delivery} ||` : setup)
				.setFooter({text: `Powered by ${url}`});
		}
		else {
			var fannyEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'fanny');
			fannyEmoji = fannyEmoji ? fannyEmoji.toString() : '';
			embed.setColor('#ffe600').setTitle(json.joke + ' ' + fannyEmoji).setFooter(`Powered by ${url}`);
		}

		await interaction.editReply({
			embeds: [
				embed
			]
		});
	}
};
