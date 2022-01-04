const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
	guildID            : String,
	welcomeChannel     : String,
	generalChannel     : String,
	botCommandsChannel: String,
	members: [{
		userID: String,
		guildID: String,
		roles: [String],
		xp: Number,
		level: Number,
	}]
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);