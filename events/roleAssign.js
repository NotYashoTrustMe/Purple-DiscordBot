module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		module.exports = {
			name    : 'interactionCreate',

			async execute(interaction) {
				if (!interaction) return;

				if (interaction.isSelectMenu()) {

					const rolesAvailableNames = [];
					for (i in interaction.component.options) {
						rolesAvailableNames.push(interaction.component.options[i].label);
					}
					const rolesSelectedNames = interaction.values;

					const rolesSelected = [];
					const rolesAvailable = [];

					// Changes the roles names to the actual roles

					rolesAvailableNames.forEach((roleName) => {
						const role = interaction.message.guild.roles.cache.find((role) => role.name === roleName);
						if (role) rolesAvailable.push(role.id);
					});

					rolesSelectedNames.forEach((roleName) => {
						const role = interaction.message.guild.roles.cache.find((role) => role.name === roleName);
						if (role) rolesSelected.push(role.id);
					});

					if (rolesSelectedNames.includes('None')) {
						for (i of rolesAvailable) {
							if (!interaction.member.roles.cache.has(i)); // If the user doesn't have the role
							await interaction.member.roles.remove(i);
						}
						return interaction.deferUpdate();
					}

					for (i of rolesSelected) {
						await interaction.member.roles.add(i);
					}

					return await interaction.deferUpdate();
				}
			}
		};
	}
};
