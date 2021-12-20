require('dotenv').config();
const Database = require('./config/Database.js');
const { readdirSync } = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const ReactionRole = require("discordjs-reaction-role").default;

const db = new Database();
db.connect();

const client = new Client({
	intents : [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
});

const rr = new ReactionRole(client, [
	{ messageId: "922135344562966579", reaction: "🌸", roleId: "922125683885477949" }, 
	{ messageId: "922135344562966579", reaction: "📗", roleId: "922125489399791648" }, 
	{ messageId: "922135344562966579", reaction: "🌊", roleId: "922125350484475935" }, 
	{ messageId: "922135344562966579", reaction: "💧", roleId: "922125477253115925" }, 
	{ messageId: "922135344562966579", reaction: "🍀", roleId: "922125191549710386" }, 
	{ messageId: "922135344562966579", reaction: "🍊", roleId: "922124801701707816" }, 
	{ messageId: "922135344562966579", reaction: "🧢", roleId: "922138901794144277" }, 
  ]);

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
