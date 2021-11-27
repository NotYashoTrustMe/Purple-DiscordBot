const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

module.exports = {
	name    : 'ready',
	once    : true,

	execute(client, commands) {
		const rest = new REST({
			version : '9'
		}).setToken(process.env.TOKEN);

		(async () => {
			try {
				if (process.env.STAGE == 'production') {
					//! If you are running for the first time or adding your own command, change it to this to this to register the command:
					/*await rest.put(Routes.applicationCommands(client.user.id), { body: commands });*/
					await rest.put(Routes.applicationCommands(client.user.id), { body: [] });
					console.log('\u001B[36mRegistered Commands \u001B[32mGlobally ✔️\u001B[0m');
				}
				else {
					//! If you are running for the first time or adding your own command, change it to this to this to register the command:
					/*await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), {
						body : commands
					});*/
					await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), {
						body : commands
					});
					console.log('\u001B[36mRegistered Commands\u001B[33m Locally ✔️\u001B[0m');
				}
			} catch (err) {
				if (err) {
					console.log(`\u001B[31m${err}\u001B[0m`);
				}
			}
		})();

		console.log(`\u001B[36mPurple is Online 🟢\u001B[0m`);

		client.user.setActivity('Commands | /help', { type: 'Playing' });
	}
};
