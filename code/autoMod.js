module.exports = {
	name    : 'messageCreate',
	async execute(message) {
		const banned = [];

		for (i of bannedList.words) {
			banned.push(i);
		}
		for (i of bannedList.links) {
			banned.push(i);
		}
		for (i of bannedList.otherLangs) {
			banned.push(i);
		}

		for (i of banned) {
			if (originalMessage.toLowerCase().includes(i)) {
				message.delete().catch(console.error);

				const warning = message.channel.send(
					`**⚠️ ${message.author} has been warned for using a banned word**\n\nOriginal Message: \`\`\`${originalMessage}\`\`\`\n`
				);

				setTimeout(() => {
					warning.then((msg) => msg.delete()).catch(console.error);
				}, 5000);
				break;
			}
			else {
				continue;
			}
		}
	}
};
