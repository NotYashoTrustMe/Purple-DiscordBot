const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('amongus')
		.setDescription('Send an Among Us Invite')
		.addStringOption((option) =>
			option.setName('code').setDescription('The Invite Code of the game (Example: `HSAD12`)').setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('server')
				.setDescription('The Server to send the invite to (Example: `Asia`)')
				.setRequired(true)
				.addChoice('Asia', 'Asia')
				.addChoice('Europe', 'Europe')
				.addChoice('North America', 'North America')
		),

	async execute(interaction) {
		const code = interaction.options.getString('code');
		const server = interaction.options.getString('server');

		const supporterRole = interaction.guild.roles.cache.find((role) => role.name.includes('Supporter'));

		const images = [
			'https://i.imgur.com/sm4Id90.png',
			'https://i.imgur.com/uSzARuQ.png',
			'https://i.imgur.com/ISGwgk9.png',
			'https://i.imgur.com/5BYAJlz.png',
			'https://i.imgur.com/QD3q03A.png',
			'https://i.imgur.com/oRxZJeO.png',
			'https://i.imgur.com/h2luLEz.png'
		];

		const color = [
			'#c60a00',
			'#f7f275',
			'#7ee857',
			'#80fadd',
			'#1830C6',
			'#602db8',
			'#d95db5'
		];

		const random = Math.floor(Math.random() * images.length);

		const Embed = new MessageEmbed()
			.setTitle('Hey Gamers!')
			.setDescription(`Join my Room on Among Us!\n *Invited by **${interaction.member.displayName}***`)
			.setColor(color[random])
			.addFields({
				name  : '_ _\nAmong Us\n_ _',
				value : `\n**Code:** \`${code}\`\n**Server:** \`${server}\`\n\n*Unmute only in Lobby and Disussion Room*`
			},
				{
					name: '_ _',
					value: `Suggest More Games to ${supporterRole} ;)` || 'Suggest More Games to the Mods ;)'
			})
			.setThumbnail(images[random])
			.setTimestamp()

		interaction.reply({
			embeds: [
				Embed
			]
		});
	}
};
