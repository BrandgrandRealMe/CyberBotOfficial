  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const request = require("request");

module.exports = {
	name: 'dadjoke',
	description: "Get a random Dadjoke",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
    await interaction.deferReply();
    const config = client.config
    const color = config.color.HEX
		
            request({
      uri: "https://icanhazdadjoke.com/", // URL
      json: true
    }, (error, response, body, json) => {
      if (error) return interaction.editReply({ content: `Command failed, try again later.`});
              
            const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTitle(`Here is a funny dad joke!`)
                .setDescription(response.body.joke)
                .setColor(color);
            return interaction.editReply({ embeds: [embed]})
  
            
        })

    
	}
};