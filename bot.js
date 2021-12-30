require('dotenv').config();
const Database = require('./config/Database.js');
const { readdirSync } = require('fs');
const { Client, Intents, Collection } = require('discord.js');

// Token: OTA4MjAxNzgwNDk0NjA2MzU2.YYyS0g.lFYBhS6_EN04EH5SQg3RK4vP0E8

const db = new Database();
db.connect();

const client = new Client({
	intents  : [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES
	],
	partials : [
		'MESSAGE',
		'CHANNEL',
		'REACTION'
	]
});

const commandFiles = [];

// Gets files inside the folders inside of the root "commands" folder
// Ignores the test folder
readdirSync('commands').forEach((dir) => {
	'test' != dir &&
		readdirSync(`commands/${dir}`).forEach((file) => {
			file.endsWith('.js') && commandFiles.push(`./commands/${dir}/${file}`);
		});
});

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(file);
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

/*
Webhooks can send anchors (markdown)

https://discohook.org/
To send anchors to a channel:

Like this: [Discohook](https://discohook.app/discord)

*/