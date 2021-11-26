const Discord = require('discord.js');
const got = require('got');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Get a random meme from Reddit')
		.addStringOption((option) =>
			option
				.setName('subreddit')
				.setDescription('The subreddit to take the memes from (r/memes by default)')
				.setRequired(false)
		),
	async execute(interaction) {
		const Embed = new Discord.MessageEmbed();
		let subreddit = interaction.options.getString('subreddit');
		if (subreddit) {
			if (subreddit.indexOf('r/') !== -1) subreddit.replace('r/', '').trim();
			else subreddit = 'r/' + subreddit;
			subreddit = subreddit.replace(/\s/g, '');
		}
		else {
			const memeSub = ['r/memes', 'r/dankmemes', 'r/terriblefacebookmemes', 'r/funny', 'r/wholesomememes', 'r/raimimemes', 'r/memeeconomy']
			subreddit = choice(memeSub);
		}
		await interaction.deferReply();
		got(`https://www.reddit.com/${subreddit}/random/.json`)
			.then((response) => {
				const [
					list
				] = JSON.parse(response.body);
				const [
					post
				] = list.data.children;

				const permalink = post.data.permalink;
				const memeLink = `https://reddit.com${permalink}`;
				const memeContent = post.data.url;
				const memeTitle = post.data.title;

				Embed.setTitle(`${memeTitle}`);
				Embed.setURL(`${memeLink}`);
				Embed.setColor('#6e6f85');
				Embed.setImage(memeContent);
				Embed.setFooter(`Source: ${subreddit}`);

				interaction.editReply({
					embeds : [
						Embed
					]
				});
			})
			.catch((HTTPError) => {
				interaction.editReply("The subreddit is either NSFW or doesn't exist");
			});
		//
	}
};

function choice(choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
}