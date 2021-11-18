const Discord = require('discord.js');
const got = require('got');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme from Reddit")
	        .addStringOption((option) =>
            option
            .setName("subreddit")
            .setDescription("The subreddit to take the memes from (r/memes by default)")
            .setRequired(false)
        ),
	async execute(interaction) {
		const embed = new Discord.MessageEmbed();
<<<<<<< HEAD
		let subreddit_input = interaction.options.getString("subreddit")
		if (subreddit_input.indexOf("r/") !== -1) {}
		else{subreddit_input="r/"+subreddit_input}
		let subreddit = "r/memes"
		if (subreddit_input) { subreddit = subreddit_input.replace(/\s/g,"") }
=======
		const subreddit_input = interaction.options.getString("subreddit")
		let subreddit = "r/memes"
		if (subreddit_input) { subreddit = subreddit_input }
>>>>>>> upstream/master
		await interaction.deferReply();
			got(`https://www.reddit.com/${subreddit}/random/.json`)
				.then(response => {
					const [list] = JSON.parse(response.body);
					const [post] = list.data.children;

					const permalink = post.data.permalink;
					const memeUrl = `https://reddit.com${permalink}`;
					const memeImage = post.data.url;
					const memeTitle = post.data.title;

					embed.setTitle(`${memeTitle}`);
					embed.setURL(`${memeUrl}`);
					embed.setColor('#6e6f85');
					embed.setImage(memeImage);
					embed.setFooter(`Source: ${subreddit}`);

					interaction.editReply({ embeds: [embed] })
				}).catch((HTTPError) => {
<<<<<<< HEAD
					interaction.editReply('The subreddit is either NSFW or doesn\'t exist: `r/{subreddit_name}`')
=======
					interaction.editReply('The subreddit should be in this form: `r/{subreddit_name}`')
>>>>>>> upstream/master
				})
			// 
	}
}