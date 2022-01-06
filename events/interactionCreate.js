var colors = require('colors');
module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		if (!interaction) return;

		// Slash Commands

		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction)
				// raise an error
				
			} catch (err) {
				console.log(err.red);
				await interaction.reply({ content: 'Sorry, Something Went Wrong at our end :(\nReport it here: <https://github.com/NotYashoTrustMe/Purple-DiscordBot/issues/new>', ephemeral: true });
			}
		}
		else if (interaction.isSelectMenu()) {
			// Role Assignment
			require('../code/roleAssign').execute(interaction);
		}
	}
};
