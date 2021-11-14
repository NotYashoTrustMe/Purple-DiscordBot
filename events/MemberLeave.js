module.exports = {
	name    : 'MemberLeave',

    async execute(member) {
        const member_channel = "909047268513038397"
        member.guild.channels.cache.get(member_channel).send(`${member.user} has left the server sadly B(`);
	}
};
