const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle, ApplicationCommandOptionType } = require('discord.js');


const Presence = {
  "online": "<:ONLINE:746539277005095023> | Online",
  "dnd": "<:DND:746539276623282187> | Do Not Disturb",
  "idle": "<:IDLE:746539277021610055> | Idle",
  "offline": "<:OFFLINE:746539276765757481> | Offline"
}
const bot = {
  "true": "<:BOT:746540840087978044> | BOT",
  "false": "<:MEMBERS:746505245240066080> | User",
}


module.exports = {
  name: 'whois',
  description: "Get info about someone!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: 'user',
      description: 'The user you want info on.',
      type: ApplicationCommandOptionType.User
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const muser = interaction.options.getMember("user") || interaction.member;
    const user = interaction.options.get('user') ?.user || interaction.user;
    const config = client.config
    const color = config.color.HEX
    const RAWhex = muser.displayHexColor
    if (RAWhex !== "#000000"){
      var hex = RAWhex
    } else {
      var hex = color
    }

    const roleIDs = muser._roles
    const rolesARR = roleIDs.map(x => "<@&" + x + ">");
    const rolesSTRING = rolesARR.toString();
    const rolesSTR = rolesSTRING.split(",", 5).toString();
    const roles = rolesSTR.replace(/,/g, "\n");
    

    try {
      const RAWstatus = muser.presence.status
      var status = Presence[RAWstatus]
    }
    catch (err) {
      var status = Presence[`offline`]
    }

    const embed = new EmbedBuilder()
      .setColor(`${hex}`)


      .setTimestamp()
      .addFields(
        { name: `Currently`, value: `${status}`, inline: true },
        { name: `Account Created:`, value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: `Account Joined Server:`, value: `<t:${parseInt(muser.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: `Top 5 Roles`, value: `${roles}`, inline: true },
        { name: `Account Type:`, value: `${bot[user.bot]}`, inline: true },
        { name: `ID`, value: `${user.id}`, inline: true }
      )
    // ,
    //        { name: `NAME`, value: `DESCTIPT`, inline: true }


    function isValidImageURL(str) {
      if (typeof str !== 'string') return false;
      return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
    }
    let pfplink = user.displayAvatarURL({ format: "png" })
    if (isValidImageURL(pfplink)) {
      embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: pfplink })

    } else {
      embed.setAuthor({ name: `${user.username}#${user.discriminator}` })
    }
    interaction.editReply({ embeds: [embed] })
  }
};