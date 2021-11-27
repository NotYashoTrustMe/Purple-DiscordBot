const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const path = require('path');
const queue = require(path.resolve('json/queue.json'));

require('dotenv').config();

var Embed = new MessageEmbed();

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from youtube')
		.addStringOption((option) =>
			option.setName('search').setDescription('Enter a Song Name/URL (YouTube) to Play').setRequired(false)
		),
	async execute(interaction, client) {
		await interaction.deferReply();
		var song = interaction.options.getString('search');
		isUrl = false;
		if (!interaction.member.voice.channel) {
			const musicChannel = process.env.MUSIC_CHANNEL;
			Embed.setTitle('Whoops!')
				.setColor('#eb3d71')
				.setDescription(`💀 You need to be in a music channel, join the <#${musicChannel}> channel`);
			return await interaction.editReply({
				embeds : [
					Embed
				]
			});
		}
		interaction.member.voice.channel.join().then(function(connection) {
			play(connection, interaction);
		});


		function play(connection, interaction) {
			if (song) {
				isUrl = song.indexOf('https://www.youtube.com/watch') == 0 ? true : false;
				if (isUrl) {
					//if the input is a url
					Embed.setTitle('Now Playing 🎵')
						.setColor('#6cc400')
						.setDescription(song)
						.setFooter(`Added by ${interaction.user.username}`, interaction.user.displayAvatarURL());
				}
				else {
					//if the input is the name of the song
				}
			}
			else {
				// if the song is not provided, plays from the queue
				for (i of queue) {
					Embed.setTitle('Now Playing 🎵')
						.setColor('#6cc400')
						.setDescription(queue[i])
						.setFooter(`Added by ${interaction.user.username}`, interaction.user.displayAvatarURL());
					await interaction.editReply({embeds : [Embed]});
				}
			}

			interaction.editReply({
				embeds : [
					Embed
				]
			});
		}
	}
};
