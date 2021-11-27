const { SlashCommandBuilder } = require('@discordjs/builders');	
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from youtube')
        .addStringOption((option) => option
                .setName('search').setDescription('Enter a song name/url(youtube) to play')
			.setRequired(false)
		),
	async execute(interaction) {
		await interaction.deferReply();
		var song = interaction.options.getString('search');
		if (!song) {
			// Play the songs in the queue
		}

		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			const musicChannel = process.env.MUSIC_CHANNEL;
            const embed = new Embed()
                .setColor(0xFF0000)
                .setDescription(`You need to be in a voice channel, join the <#${musicChannel}>`)
            return await interaction.reply({embeds: [embed]});
        }

		console.log(interaction.member.voice)
		interaction.editReply(`Playing ${interaction.options.getString('search')}`);
	}
};
