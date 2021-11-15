/*npm install*/

require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MEMBERS
	]
});

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

var commands = [];

client.commands = new Discord.Collection();

for (var file of commandFiles) {
	var command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));

	}
}

client.login(process.env.TOKEN);
