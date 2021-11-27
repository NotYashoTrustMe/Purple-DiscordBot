const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const path = require('path');
const queue = require(path.resolve('json/queue.json'));

require('dotenv').config();

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from youtube')
		.addStringOption((option) =>
			option.setName('search').setDescription('Enter a song name/url(youtube) to play').setRequired(false)
		),
	async execute(interaction) {
		await interaction.deferReply();
		var song = interaction.options.getString('search');
		if (!song) {
			// Play the songs in the queue
		}

		if (!interaction.member.voice.channel) {
			const musicChannel = process.env.MUSIC_CHANNEL;
			const Embed = new MessageEmbed()
				.setTitle('Whoops!')
				.setColor('#eb3d71')
				.setDescription(`💀 You need to be in a music channel, join the <#${musicChannel}> channel`);
			return await interaction.editReply({
				embeds : [
					Embed
				]
			});
		}
		interaction.editReply(`Playing ${interaction.options.getString('search')}`);
	}
};
