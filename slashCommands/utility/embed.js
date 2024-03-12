const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'embed',
  description: "create a simple embed.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  default_member_permissions: 'EmbedLinks',
  options: [
    {
      name: 'desc',
      description: 'Set the description',
      type: 3,
      required: true
    },
    {
      name: 'title',
      description: 'Set the title',
      type: 3
    },
    {
      name: 'thumb',
      description: 'Set the thumbnail',
      type: 11
    },
    {
      name: 'image',
      description: 'Set the image',
      type: 11
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const user = interaction.user
    const muser = interaction.member
    const config = client.config
    const color = config.color.HEX
    const RAWhex = muser.displayHexColor


    const RAWtitle = interaction.options.get('title')
    const RAWdesc = interaction.options.get('desc')
    const RAWthumb = interaction.options.getAttachment('thumb')
    const RAWimg = interaction.options.getAttachment('image')
    try {
      var title = RAWtitle.value
    } catch (err) {
      var title = ""
    }
    try {
      var thumb = RAWthumb.url
    } catch (err) {
      var thumb = ""
    }
    try {
      var img = RAWimg.url
    } catch (err) {
      var img = ""
    }


    if (RAWhex !== "#000000") {
      var hex = RAWhex
    } else {
      var hex = color
    }

    let pfplink = user.displayAvatarURL({ format: "png" })

    const embed = new EmbedBuilder()
      .setDescription(RAWdesc.value)
      .setColor(`${hex}`)

    if (title !== "") {
      embed.setTitle(RAWtitle.value)
    }
    if (thumb !== "" && isValidImageURL(thumb)) {
      embed.setThumbnail(thumb)
    }
    if (img !== "" && isValidImageURL(img)) {
      embed.setImage(img)
    }
    //code 

    function isValidImageURL(str) {
      if (typeof str !== 'string') return false;
      return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
    }

    if (isValidImageURL(pfplink)) {
      embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: pfplink })

    } else {
      embed.setAuthor({ name: `${user.username}#${user.discriminator}` })
    }
    interaction.editReply({ embeds: [embed] })

  }
};