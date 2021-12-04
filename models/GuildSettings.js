const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
    guildID: String,
    welcomeChannel: String,
    generalChannel: String,
    botCommandsChannel: String,
    memberLogsChannel: String
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);