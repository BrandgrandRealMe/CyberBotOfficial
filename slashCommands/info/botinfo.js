const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');


//const config = require('.../config.json')
module.exports = {
  name: 'botinfo',
  description: "View info about bot",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    await interaction.deferReply();
    const config = client.config
    let bownerINFO = client.users.cache.get("531186390717825074");

    let bowner = `${bownerINFO.username}#${bownerINFO.discriminator}`
    
    const botcor = client.config.color.HEX
    var milliseconds = parseInt((client.uptime % 1000) / 100),
      seconds = parseInt((client.uptime / 1000) % 60),
      minutes = parseInt((client.uptime / (1000 * 60)) % 60),
      hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
    days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
    const embed = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setTitle(`🤖 Botinfo`)
      .setColor(botcor)
      .addFields(
        { name: `Name:`, value: `${client.user.username}`, inline: true },
        { name: "<:OWNER:746502146232418374> Developer:", value: bowner, inline: true },
        { name: `Servers:`, value: `${client.guilds.cache.size}`, inline: true },
        { name: `<:MEMBERS:746505245240066080> Users:`, value: `${client.users.cache.size}`, inline: true },
        { name: `<:CHANNEL:746502146073165855> Channels:`, value: `${client.channels.cache.size}`, inline: true },
        { name: `<:BOT:746540840087978044> Version:`, value: `v${config.ver}`, inline: true },
        { name: `Library:`, value: `${config.lib} v${config.libver}`, inline: true },
        { name: `Ping:`, value: `${client.ws.ping}ms ping`, inline: true },
        { name: `Ram:`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}`, inline: true },
        { name: `Uptime: `, value: days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", inline: true })
      .setThumbnail(client.user.displayAvatarURL())
    const actionRow = new ActionRowBuilder()
      .addComponents([
        new ButtonBuilder()
          .setLabel('Invite')
          .setURL(inviteUrl)
          .setStyle(5)
      ])
    return interaction.editReply({ embeds: [embed], components: [actionRow] })

  }
};