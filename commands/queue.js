const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const queue = require(path.resolve('json/queue.json'));

module.exports = {
	data    : new SlashCommandBuilder().setName('queue').setDescription('Shows the song queue'),
	async execute(interaction) {
		await interaction.deferReply();
		let description = [];

		for (i of queue) {
			description.push(queue.indexOf(i) + 1 + '. ' + i + '\n');
		}

		description = description.join('');

		const Embed = new MessageEmbed()
			.setTitle('Here is the Song Queue')
			.setColor('#6069e0')
			.setDescription(description);
		return await interaction.editReply({
			embeds : [
				Embed
			]
		});
	}
};
