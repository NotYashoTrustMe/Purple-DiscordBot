const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dad-joke')
        .setDescription(`Get a dad joke`),
    async execute(interaction) {
        await interaction.deferReply();
        const url = 'https://icanhazdadjoke.com/';
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json'
            }
        });
        const json = await response.json();

        const embed = new MessageEmbed()
            .setColor('#ffe600')
            .setTitle(json.joke)
            .setFooter('Powered by icanhazdadjoke.com')

        await interaction.editReply({embeds: [embed]});
    }
}