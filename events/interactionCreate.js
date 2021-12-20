module.exports = {
	name    : 'interactionCreate',

	async execute(interaction) {
		if (!interaction) return;
		
		// For the select menus
		if (interaction.isSelectMenu()) {
			const roles = interaction.values;
			for (i of roles) {
				const role = interaction.member.guild.roles.cache.find(role => role.name == i)
				if (role) {
					console.log(`Assigning ${role.name} role to ${interaction.user.username}`)
					interaction.member.roles.add(role);
					console.log('\u001B[32m'+'Role assigned'+'\u001B[0m')
					interaction.deferUpdate();
					interaction.member.send(`Congratulations 🎉!\n You have been assigned the ${role.name} role.`)
				}
			}
			return;
		}

		// For slash commands
		if (interaction.isCommand()) {
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
