const mongoose = require('mongoose');

const MemberStatsSchema = new mongoose.Schema({
	guildID : String,
	userID  : String,
	roles   : [String],
	xp      : Number,
	level   : Number
});

module.exports = mongoose.model('MemberStats', MemberStatsSchema);
