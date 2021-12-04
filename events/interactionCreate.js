module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		if (!interaction) return
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (err) {
			console.log('\u001B[31m' + err + '\u001B[0m');
			await interaction.reply({ content: 'Your command could not be processed :(', ephemeral: true });
		}	
	}
};
