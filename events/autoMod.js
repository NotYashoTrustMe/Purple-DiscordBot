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
				const warningMessage = i.match(/\b(https?:\/\/\S+)/gi)
					? `**⚠️ ${message.author} has been warned for using a banned GIF**\n\nOriginal Message: ${originalMessage}\n`
					: `**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: \`\`\`${originalMessage}\`\`\`\n`;
				
				const warning = message.channel.send(warningMessage);

				setTimeout(() => {
					warning.then((msg) => msg.delete());
				}, 5000);
				break;
			}
		}
	}
};
