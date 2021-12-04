const { SlashCommandBuilder } = require('@discordjs/builders');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('set-welcome-channel')
		.setDescription('Set the channel where the welcome message will be sent.')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('The channel where the welcome message will be sent.')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();

		// check for admin permissions
		if (!interaction.member.permissions.has('ADMINISTRATOR')) {
			await interaction.editReply({ content: 'You are not authorized to use this command', ephemeral: true });
			return;
		}

		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.error(err);
				interaction.editReply({
					content   : 'An error occurred while trying to set the welcome channel.',
					ephemeral : true
				});
				return;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id           : interaction.guild.id,
					welcome_channel_id : interaction.options.getChannel('channel').id
				});
			}
			else {
				settings.welcome_channel_id = interaction.options.getChannel('channel').id;
			}
			settings.save((err) => {
				if (err) {
					console.error(err);
					interaction.editReply({
						content: 'An error occurred while trying to set the welcome channel.',
						ephemeral: true
					});
					return;
				}
				else {
					const welcomeChannel = interaction.options.getChannel('channel').id;
					const okayEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'nice');
					interaction.editReply(
						okayEmoji
							? `Welcome channel set to <#${welcomeChannel}> ${okayEmoji}`
							: `Welcome channel set to <#${welcomeChannel}>`
					);
				}
			});
		});
	}
};
