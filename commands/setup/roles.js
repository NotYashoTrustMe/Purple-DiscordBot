const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Use this command in your self-role-assignment channel'),
	async execute(interaction) {

		// check is the interaction is from the admin
		if (!interaction.member.permissions.has('ADMINISTRATOR')) {
			await interaction.reply({ content: 'You are not allowed to use this command', ephemeral: true });
			return;
		}

		await interaction.deferReply();

		await interaction.editReply({
			files : [
				'https://i.imgur.com/i59eMLq.png'
			]
		});

		const Embed = new MessageEmbed()
			.setTitle('Select Your Roles!')
			.setThumbnail('https://i.imgur.com/jMdib7l.png')
			.setDescription('Choose Roles which best suit you')
			.addFields([
				{ name: '_ _', value: '_ _' },

				{ name: 'Art 🎨', value: 'Graphic Designers, Paintings, Illustration, Animation and more ' },

				{ name: 'Music 🎵', value: "Pianist? Know how to play that guitar 🎸? Well You're Welcome then " },

				{ name: 'Gaming 🎮', value: 'Where my boys at? ' },

				{ name: 'Anime 👺', value: 'For the anime lovers out there! ' },

				{ name: 'Programming 💻', value: 'All developers are welcome ' },

				{ name: 'Memes 🐸', value: 'Never Gonna Give You Up!' },

				{ name: 'Weeb 🏯', value: "Oh so you love Japan more than even you're country? lol me too " },

				{ name: '_ _', value: '_ _' }
			])
			.setColor('#fc4982');

		const menu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Select Your Roles! [Max 4]')
				.setMinValues(0)
				.setMaxValues(4)
				.addOptions([
					{
						label       : 'Art',
						description : 'Graphic Designers, Paintings, Illustration, Animation and more',
						value       : 'Art',
						emoji       : '🎨'
					},
					{
						label       : 'Music',
						description : "For those who're interested in music",
						value       : 'Music',
						emoji       : '🎵'
					},
					{
						label       : 'Gaming',
						description : 'Where my boys at?',
						value       : 'Gaming',
						emoji       : '🎮'
					},
					{
						label       : 'Anime',
						description : 'For the anime lovers out there',
						value       : 'Anime',
						emoji       : '👺'
					},
					{
						label       : 'Programming',
						description : 'All developers are welcome',
						value       : 'Programming',
						emoji       : '💻'
					},
					{
						label       : 'Memes',
						description : 'Never Gonna Give You Up!',
						value       : 'Memes',
						emoji       : '🐸'
					},
					{
						label       : 'Weeb',
						description : "Oh so you love Japan more than even you're country? lol me too",
						value       : 'Weeb',
						emoji       : '🏯'
					},
					{
						label       : 'None',
						description : 'To Remove All Roles',
						value       : 'None',
						emoji       : '❌'
					}
				])
		);

		await interaction.followUp({
			embeds     : [
				Embed
			],
			components : [
				menu
			]
		});
	}
};
