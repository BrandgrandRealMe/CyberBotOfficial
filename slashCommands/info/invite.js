const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'invite',
  description: "Get the bot's invite link",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: [],
  botPerms: [],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const config = client.config
    const color = config.color.HEX
    const BOTinviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CYBERBOT_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
    const ServerinviteUrl = client.supportinv;
    
    const embed = new EmbedBuilder()
      .setTitle('Invite me')
      .setDescription(`Invite the bot to your server. Or join my server!`)
      .setColor(color)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: client.user.tag })

    const actionRow = new ActionRowBuilder()
      .addComponents([
        new ButtonBuilder()
          .setLabel('bot')
          .setURL(BOTinviteUrl)
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel('Server')
          .setURL(ServerinviteUrl)
          .setStyle(ButtonStyle.Link)
        
      ])
    return interaction.editReply({ embeds: [embed], components: [actionRow] })
  }
};
