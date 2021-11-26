require('dotenv').config();
module.exports = {
	name    : 'MemberLeave',
	async execute(member) {
		const memberChannel = process.env.MEMBER_LOG_CHANNEL;
		member.guild.channels.cache.get(memberChannel).send(`${member.user} has left the server B(`);
	}
};
