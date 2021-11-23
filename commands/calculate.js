const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calculate')
		.setDescription('Calculate an Equation')
		.addStringOption((option) =>
			option.setName('equation').setDescription('The Equation to Calculate').setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		try {
			const equation = interaction.options.getString('equation').replace(' ', '').trim();
			const equation_print = [];
			for (i of equation) {
				if (isDigit(i) || i == '.') {
					equation_print.push(i);
				}
				else {
					equation_print.push(' ' + i + ' ');
				}
			}
			interaction.editReply(`Your Answer Is: \`\`\`ARM\n${equation_print.join('')} = ${eval(equation)} \n\`\`\``);
		} catch (err) {
			interaction.editReply(
				'```ARM\nError: Please Provide Numbers and [+, -, *, /, %] only\nTry !help for docs\n```'
			);
		}
	}
};

function isDigit(str) {
	if (typeof str != 'string') return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
}
