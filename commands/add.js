const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const queue = require(path.resolve('json/queue.json'));

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a song to the queue')
		.addStringOption((option) =>
			option.setName('song').setDescription('The song name/link you want to add to the queue').setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		song = toTitleCase(interaction.options.getString('song'));
		queue.push(song);
		data = JSON.stringify(queue);
		fs.writeFileSync(path.resolve('json/queue.json'), data);
		const Embed = new MessageEmbed()
			.setTitle('You\'re all set!')
			.setColor('#00D26A') 
			.setDescription(`✅  ${song} added to queue!`);
		return await interaction.editReply({
			embeds : [
				Embed
			]
		});
	}
};

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
