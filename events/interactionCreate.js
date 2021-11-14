require('dotenv').config();
module.exports = {
	name : 'interactionCreate',

	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (err) {
			console.log('\u001B[31m' + err + '\u001B[0m');
			await interaction.reply('An error occurred processing your command B(');
		}
	}
};
