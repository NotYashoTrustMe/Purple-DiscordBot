const { SlashCommandBuilder } = require('@discordjs/builders');
const GuildSettings = require('../../models/GuildSettings');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('set-bot-channel')
		.setDescription('Set the channel where bot commands will be sent.')
		.addChannelOption((option) =>
			option.setName('channel').setDescription('The channel to set as the bot commands channel').setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();

		if (!interaction.member.permissions.has('ADMINISTRATOR')) {
			interaction.editReply({ content: 'You are not authorized to use this command', ephemeral: true });
			return;
		}

		GuildSettings.findOne({ guildID: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.error(err);
				interaction.editReply({
					content   : 'An error occurred while trying to set the bot commands channel.',
					ephemeral : true
				});
				return;
			}

			if (!settings) {
				settings = new GuildSettings({
					guildID            : interaction.guild.id,
					botCommandsChannel : interaction.options.getChannel('channel').id
				});
			}
			else {
				settings.botCommandsChannel = interaction.options.getChannel('channel').id;
			}
			settings.save((err) => {
				if (err) {
					console.error(err);
					interaction.editReply({
						content   : 'An error occurred while trying to set the bot commands channel.',
						ephemeral : true
					});
					return;
				}
				else {
					const botCommandsChannel = interaction.options.getChannel('channel').id;
					const okayEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'nice');
					interaction.editReply(
						okayEmoji
							? `Bot Commands channel set to <#${botCommandsChannel}> ${okayEmoji}`
							: `Bot Commands channel set to <#${botCommandsChannel}>`
					);
				}
			});
		});
	}
};
