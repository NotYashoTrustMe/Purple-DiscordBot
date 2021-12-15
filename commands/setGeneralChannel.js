const { SlashCommandBuilder } = require('@discordjs/builders');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	data    : new SlashCommandBuilder()
		.setName('set-general-channel')
		.setDescription('Set the main channel where new members will be redirected to ')
		.addChannelOption((option) =>
			option.setName('channel').setDescription('The channel to set as the general channel').setRequired(true)
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
					content   : 'An error occurred while trying to set the general channel.',
					ephemeral : true
				});
				return;
			}

			if (!settings) {
				settings = new GuildSettings({
					guildID        : interaction.guild.id,
					generalChannel : interaction.options.getChannel('channel').id
				});
			}
			else {
				settings.generalChannel = interaction.options.getChannel('channel').id;
			}
			settings.save((err) => {
				if (err) {
					console.error(err);
					interaction.editReply({
						content   : 'An error occurred while trying to set the general channel.',
						ephemeral : true
					});
					return;
				}
				else {
					const generalChannel = interaction.options.getChannel('channel').id;
					const okayEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'nice');
					interaction.editReply(
						okayEmoji
							? `General channel set to <#${generalChannel}> ${okayEmoji}`
							: `General channel set to <#${generalChannel}>`
					);
				}
			});
		});
	}
};
