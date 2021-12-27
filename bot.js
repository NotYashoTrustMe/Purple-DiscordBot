require('dotenv').config();
const Database = require('./config/Database.js');
const { readdirSync } = require('fs');
const { Client, Intents, Collection } = require('discord.js');

const db = new Database();
db.connect();

const client = new Client({
	intents  : [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials : [
		'MESSAGE',
		'CHANNEL',
		'REACTION'
	]
});

const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));
commandFiles.append(readdirSync('./commands/setup').filter((file) => file.endsWith('.js')));
commandFiles.append(readdirSync('./commands/fun').filter((file) => file.endsWith('.js')));
commandFiles.append(readdirSync('./commands/moderation').filter((file) => file.endsWith('.js')));
commandFiles.append(readdirSync('./commands/musicBot').filter((file) => file.endsWith('.js')));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
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
