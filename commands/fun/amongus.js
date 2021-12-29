const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('amongus')
		.setDescription('Send an Among Us Invite')
		.addStringOption((option) =>
            option
                .setName('code')
                .setDescription('The Invite Code of the game (Example: `HSAD12`)')
                .setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('server')
				.setDescription('The Server to send the invite to (Example: `Asia`)')
				.setRequired(true)
    ),
    
	async execute(interaction) {
		await interaction.deferReply();

		const code = interaction.getStringOption('code');
		const server = interaction.getStringOption('server');

		const supporterRole = interaction.guild.roles.cache.find((role) => role.name.includes('Supporter'));

		const embed = new MessageEmbed()
			.setTitle('Hey Gamers!')
			.setDescription('Join my Room on Among Us!')
			.setColor('#f61819')
			.addField(
				'_ _\nAmong Us\n_ _',
				`\nCode: \`${code}\`\nServer: \`${server}\`\n\n*Unmute only in Lobby and Disussion Room*`
			)
			.setFooter(
				supporterRole ? `Suggest More Games to ${supporterRole} ;)` : 'Suggest More Games to the Mods ;)'
			);
		interaction.editReply({ embeds: embed });
	}
};
