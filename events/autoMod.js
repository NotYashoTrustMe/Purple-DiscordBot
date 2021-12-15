const path = require('path');
const bannedWords = require(path.resolve('config/bannedWords.json'));
module.exports = {
	name    : 'messageCreate',

	async execute(message) {
		if (message.author.bot) return;
		originalMessage = message.content;
		for (i of bannedWords) {
			if (originalMessage.toLowerCase().includes(i)) {
				message.delete();
				// checks if the message contains a link
				const original = originalMessage.match(/\b(https?:\/\/\S+)/gi)
					? originalMessage
					: `\`\`\`${originalMessage}\`\`\``;
				const warning = message.channel.send(
					`**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: ${original}\n`
				);

				setTimeout(() => {
					warning.then((msg) => msg.delete());
				}, 5000);
				break;
			}
		}
	}
};
