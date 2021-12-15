const bannedWords = require('../config/bannedWords.json');
module.exports = {
	name    : 'messageCreate',

	async execute(message) {
		if (message.author.bot) return;
		originalMessage = message.content;
		for (i of bannedWords) {
			if (originalMessage.toLowerCase().includes(i)) {
				message.delete();

				const warning = message.channel.send(
					`**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: \n\`\`\`${originalMessage}\`\`\`\n`
				);
		
				setTimeout(() => {
					warning.then((msg) => msg.delete());
				}, 5000);
			}
		}
	}
};
