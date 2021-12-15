const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
	guildID            : String,
	welcomeChannel     : String,
	generalChannel     : String,
	botCommandsChannel : String
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);
