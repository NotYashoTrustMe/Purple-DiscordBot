const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

module.exports = {
    name: "ready",
    once: true,

    execute(client, commands) {
        	const rest = new REST({
		    version : '9'
            }).setToken(process.env.TOKEN);

            (async () => {
                try {
                    if (process.env.STAGE == 'production') {
                        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
                        console.log('\u001B[36mRegistered Commands \u001B[32mGlobally ✔️\u001B[0m');
                    }
                    else {											  
                        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
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

            let generalChannel = client.channels.cache.get('908601642075693086');
            generalChannel.send('Hi, Everyone!');
    }
}