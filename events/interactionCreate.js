const { IntegrationApplication } = require('discord.js');

module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		if (!interaction) return;

		// For the select menus
		if (interaction.isSelectMenu()) {
			const rolesSelectedNames = interaction.values;

			const rolesAvailableNames = [
				'Art',
				'Music',
				'Gaming',
				'Anime',
				'Programming',
				'Photography',
				'Weeb'
			];

			const rolesSelected = [];
			const rolesAvailable = [];

			//? Changes the roles names to the actual roles

			rolesAvailableNames.forEach((roleName) => {
				const role = interaction.message.guild.roles.cache.find((role) => role.name === roleName);
				if (role) rolesAvailable.push(role.id);
			});

			console.log('Roles selected: ' + rolesSelectedNames);
			rolesSelectedNames.forEach((roleName) => {
				const role = interaction.message.guild.roles.cache.find((role) => role.name === roleName);
				if (role) rolesSelected.push(role.id);
			});

			// Removes the roles that are not selected

			for (i of rolesAvailable) {
				await interaction.member.roles.remove(i);
			}

			for (i of rolesSelected) {
				await interaction.member.roles.add(i);
			}
			
			return interaction.deferUpdate();
		}

		// For slash commands
		else if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (err) {
				console.log('\u001B[31m' + err + '\u001B[0m');
				await interaction.reply({ content: 'Your command could not be processed :(', ephemeral: true });
			}
		}
	}
};
