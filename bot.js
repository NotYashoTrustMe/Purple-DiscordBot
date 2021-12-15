require('dotenv').config();
const Database = require('./config/Database.js');
const { readdirSync } = require('fs');
const { Client, Intents, Collection } = require('discord.js');

const db = new Database();
db.connect();

const client = new Client({
	intents : [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	]
});
const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

var commands = [];

client.commands = new Collection();

for (var file of commandFiles) {
	var command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(process.env.TOKEN);