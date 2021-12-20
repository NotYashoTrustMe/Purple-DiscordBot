const { Interaction } = require("discord.js");

module.exports = {
	name    : 'messageReactionAdd',
	async execute(reaction, user) {
		console.log('bruh')
		console.log(`${user.username} reacted with ${reaction.emoji.name}`);
		const message = reaction.message;
		const verifyChannel = message.guild.channels.cache.find((c) => c.name.includes('rules'));
		const member = message.guild.members.cache.get(user.id);
		if (member.user.bot) return;
		const verify = message.guild.roles.cache.find((role) => role.name === 'Member');

		if (reaction.emoji.name === '✅' && message.channel.id === verifyChannel.id) {
			member.roles.add(verify).catch(console.error);
			await reaction.remove(member).catch(console.error);
		}
		message.reply('Hello World!');
	}
};
