module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		if (!interaction) return;

		// ################################## SLASH COMMANDS ##################################

		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (err) {
				console.log('\u001B[31m' + err + '\u001B[0m');
				await interaction.reply({ content: 'Sorry, Your command could not be processed :(', ephemeral: true });
			}
		}
		else if (interaction.isSelectMenu()) {
			// ################################## ROLES ASSSIGNMENT ##################################

			const rolesSelectedNames = interaction.values;
			const rolesAvailableNames = interaction.component.options.map((o) => o.value);

			const rolesSelected =
				!rolesSelectedNames || !rolesSelectedNames.includes('None')
					? rolesSelectedNames.map((name) => interaction.guild.roles.cache.find((r) => r.name === name))
					: null;
			const rolesAvailable = rolesAvailableNames.map((name) =>
				interaction.guild.roles.cache.find((r) => r.name === name)
			);

			if (!rolesSelected) return;

			console.log(interaction.member.displayName + ' has selected ' + rolesSelected);

			for (i of rolesAvailable) {
				console.log(i.name)
			}

			for (i of rolesSelected) {
				console.log(i.name)
			}

			return;
		}
	}
};
