module.exports = {
	name    : 'interactionCreate',
	async execute(interaction) {
		const rolesSelectedNames = interaction.values;
		const rolesAvailableNames = interaction.component.options.map((o) => o.value);
		rolesAvailableNames.splice(rolesAvailableNames.indexOf('None'), 1);

		const rolesSelected = rolesSelectedNames.map((name) =>
			interaction.guild.roles.cache.find((r) => r.name === name)
		);
		const rolesAvailable = rolesAvailableNames.map((name) =>
			interaction.guild.roles.cache.find((r) => r.name === name)
		);

		if (rolesSelectedNames.includes('None') || rolesSelectedNames.length === 0) {
			console.log(interaction.member.displayName + ' has ' + 'selected no roles');
			await interaction.member.roles.remove(rolesAvailable);
			console.log('Removed all roles from ' + interaction.member.displayName);
			return interaction.deferUpdate();
		}

		console.log(interaction.member.displayName + ' has selected ' + interaction.values);

		const rolesToAdd = rolesAvailable.filter(
			(r) => rolesSelected.includes(r) && !interaction.member.roles.cache.has(r)
		);

		const rolesToRemove = rolesAvailable.filter(
			(r) => !rolesSelected.includes(r) && interaction.member.roles.cache.has(r)
		);

		if (rolesToAdd.length > 0) {
			await interaction.member.roles.add(rolesToAdd);
			console.log(interaction.member.displayName + ' has been added to ' + rolesToAdd.map((r) => r.name));
		}

		if (rolesToRemove.length > 0) {
			await interaction.member.roles.remove(rolesToRemove);
			console.log(interaction.member.displayName + ' has been removed from ' + rolesToRemove.map((r) => r.name));
		}

		return interaction.deferUpdate();
	}
};
