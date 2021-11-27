const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from youtube')
        .addStringOption((option) => option
                .setName('search').setDescription('Enter a song name/url(youtube) to play')
                .setRequired(false)
		),
	async execute(interaction) {
		var song = interaction.options.getString('search');
		if (!song) {
			// Play the songs in the queue
		}
		await interaction.deferReply();
		interaction.editReply(`Playing ${interaction.options.getString('search')}`);
	}
};
