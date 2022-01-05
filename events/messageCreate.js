const MemberStats = require('../models/MemberStats.js');
module.exports = {
	name    : 'messageCreate',

	async execute(message) {
		if (message.author.bot) return;
		originalMessage = message.content;

		// Leveling
		require('../code/leveling').execute(message);

		// Auto MODERATION
		require('../code/autoMod').execute(message);
	}
};
