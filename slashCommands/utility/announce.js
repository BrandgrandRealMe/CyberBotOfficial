const {
  ApplicationCommandType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "announce",
  description: "create a simple embed for a announcement.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "channel",
      description: "Set the channel",
      type: 7,
      required: true,
    },
    {
      name: "desc",
      description: "Set the description",
      type: 3,
      required: true,
    },
    {
      name: "mention",
      description: "Set the mention",
      type: 9,
      required: false,
    },
    {
      name: "title",
      description: "Set the title",
      type: 3,
    },
    {
      name: "thumb",
      description: "Set the thumbnail",
      type: 11,
    },
    {
      name: "image",
      description: "Set the image",
      type: 11,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const announcementChannel = interaction.options.getChannel("channel");
    const user = interaction.user;
    const muser = interaction.member;
    const config = client.config;
    const color = config.color.HEX;
    const RAWhex = muser.displayHexColor;

    const RAWtitle = interaction.options.get("title");
    const RAWdesc = interaction.options.get("desc");
    const RAWthumb = interaction.options.getAttachment("thumb");
    const RAWimg = interaction.options.getAttachment("image");

    if (!announcementChannel.permissionsFor(muser).has(PermissionsBitField.Flags.SendMessages)) return interaction.editReply({ content: "You don't have permission to send messages in that channel." });
    if (!announcementChannel.permissionsFor(interaction.guild.me).has(PermissionsBitField.Flags.SendMessages)) return interaction.editReply({ content: "I don't have permission to send messages in that channel." });
    console.log("Sending announcement to " + announcementChannel.name);
    try {
      var title = RAWtitle.value;
    } catch (err) {
      var title = "";
    }
    try {
      var thumb = RAWthumb.url;
    } catch (err) {
      var thumb = "";
    }
    try {
      var img = RAWimg.url;
    } catch (err) {
      var img = "";
    }

    if (RAWhex !== "#000000") {
      var hex = RAWhex;
    } else {
      var hex = color;
    }

    let pfplink = user.displayAvatarURL({ format: "png" });

    const embed = new EmbedBuilder()
      .setDescription(`Sent Embed`)
      .setColor(`${color}`);

    const announcementEmbed = new EmbedBuilder()
      .setDescription(RAWdesc.value)
      .setColor(`${hex}`);

    if (title !== "") {
      announcementEmbed.setTitle(RAWtitle.value);
    }
    if (thumb !== "" && isValidImageURL(thumb)) {
      announcementEmbed.setThumbnail(thumb);
    }
    if (img !== "" && isValidImageURL(img)) {
      announcementEmbed.setImage(img);
    }
    //code

    function isValidImageURL(str) {
      if (typeof str !== "string") return false;
      return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
    }

    if (isValidImageURL(pfplink)) {
      announcementEmbed.setAuthor({
        name: `${user.username}#${user.discriminator}`,
        iconURL: pfplink,
      });
    } else {
      announcementEmbed.setAuthor({
        name: `${user.username}#${user.discriminator}`,
      });
    }

    if (interaction.options.get("mention") !== null) {
      console.log(interaction.options.getMentionable("mention"))
      announcementChannel.send({
        content: `Mention: ${interaction.options.getMentionable("mention")}`,
        embeds: [announcementEmbed],
      });
    } else {
      announcementChannel.send({
        embeds: [announcementEmbed],
      });
    }
    console.log("done?")
    interaction.editReply({ embeds: [embed] });
  },
};
