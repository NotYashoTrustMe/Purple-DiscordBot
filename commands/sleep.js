const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleep')
		.setDescription('Makes the bot go to sleep'),
	async execute(interaction) {
		if (interaction.member.permissions.has('ADMINISTRATOR')) {
			await interaction.reply({ content: 'Purple is going offline', ephemeral: true });
			console.log('Going offline');
			process.exit(0);
		}
	}
}