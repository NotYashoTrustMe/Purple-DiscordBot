const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const GuildSettings = require('../models/GuildSettings.js');
require('dotenv').config();

module.exports = {
	name    : 'ready',
	once    : true,

	execute(client, commands) {
		const rest = new REST({
			version : '9'
		}).setToken(process.env.TOKEN);

		(async () => {
			const guildSettings = await GuildSettings.findOne({});
			const guildID = guildSettings.guildID;

			try {
				if (process.env.STAGE == 'production') {
					await rest.put(Routes.applicationCommands(client.user.id, guildID), { body: [] });
					console.log(`\u001B[36m` + `[✓] Registered Commands ` + `\u001B[32m` + `Globally` + `\u001B[0m`);
				}
				else {
					/* 
					* await rest.put(Routes.applicationGuildCommands(client.user.id, guildID), {body: commands});
				   */
					await rest.put(Routes.applicationGuildCommands(client.user.id, guildID), {
						body : commands
					});
					console.log(`\u001B[36m` + `[✓] Registered Commands` + `\u001B[33m ` + `Locally` + `\u001B[0m`);
				}
			} catch (err) {
				if (err) {
					console.log(`\u001B[31m` + `[x] ${err}` + `\u001B[0m`);
				}
			}
		})();

		console.log(`\u001B[36m` + `[✓] Purple is Online` + `\u001B[0m`);
		client.user.setActivity(`Commands ▲ /help`);
	}
};
