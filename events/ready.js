const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const GuildSettings = require('../models/GuildSettings.js');
var colors = require('colors');
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

			try {
				await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
				console.log('['.black + '✓'.cyan + '] '.black + 'Registered Commands '.green + 'Globally'.yellow);
			} catch (err) {
				if (err) {
					console.log('['.black + 'x'.red + '] '.black + 'Error'.red + '\n' + err);
				}
			}
		})();

		client.user.setActivity('Help Commands | /help');
		console.log('['.black + '✓'.cyan + '] '.black + 'Purple is Online'.green);
	}
};
