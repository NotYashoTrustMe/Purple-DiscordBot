const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow,  MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data    : new SlashCommandBuilder().setName('roles').setDescription('pong'),
	async execute(interaction) {
		await interaction.deferReply();

		await interaction.editReply({files: ["https://i.imgur.com/i59eMLq.png"]});

		const Embed = new MessageEmbed()
			.setTitle('Select Your Roles Role')
			.setThumbnail('https://i.imgur.com/jMdib7l.png')
			.setDescription('Choose Roles which best suit you')
			.addFields([
				{ name: '_ _', value: '_ _' },

				{ name: 'Art 🎨', value: 'Graphic Designers, Paintings, Illustration, Animation and more ' },

				{ name  : 'Music 🎵', value : "Pianist? Know how to play that guitar 🎸? Well You're Welcome then "},

				{ name: 'Gaming 🎮', value: 'Where my boys at? ' },

				{ name: 'Anime 👺', value: 'For the anime lovers out there! ' },

				{ name: 'Programming 💻', value: 'All developers are welcome ' },

				{ name: 'Photography 📸', value: "Interested in capturing the moment? Well, you're welcome! " },

				{ name: 'Weeb 🏯', value: "Oh so you love Japan more than even you're country? lol me too " },

				{ name: '_ _', value: '_ _' }
			])
			.setColor('#fc4982');

		const menu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Select Your Roles! [Max 4]')
				.setMinValues(1)
				.setMaxValues(4)
				.addOptions([
					{
						label       : 'Art 🎨',
						description : 'Graphic Designers, Paintings, Illustration, Animation and more',
						value       : 'Art'
					},
					{
						label       : 'Music 🎵',
						description : "Pianist? Know how to play that guitar 🎸? Well You're Welcome then",
						value       : 'Music'
					},
					{
						label       : 'Gaming 🎮',
						description : 'Where my boys at?',
						value       : 'Gaming'
					},
					{
						label       : 'Anime 👺',
						description : 'For the anime lovers out there',
						value       : 'Anime'
					},
					{
						label       : 'Programming 💻',
						description : 'All developers are welcome',
						value       : 'Programming'
					},
					{
						label       : 'Photography 📸',
						description : "Interested in capturing the moment? Well, you're welcome!",
						value       : 'Photography'
					},
					{
						label       : 'Weeb 🏯',
						description : "Oh so you love Japan more than even you're country? lol me too",
						value       : 'Weeb'
					}
				])
		);

		await interaction.followUp({embeds: [Embed], components: [menu]});
	}
};
