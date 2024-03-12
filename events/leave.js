const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
const log = client.log;

client.on("GuildMemberRemove", member => { //usage of welcome event
  console.log("ran")
  const config = client.config
  const color = config.color.HEX
  const RAWhex = member.displayHexColor



  function isValidImageURL(str) {
    if (typeof str !== 'string') return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
  }

  if (RAWhex !== "#000000") {
    var hex = RAWhex
  } else {
    var hex = color
  }
  //geting channel  

  const channels = member.guild.channels.cache;
  const [filteredChannels] = channels.filter(channel => channel.topic && channel.topic.includes(`{goodbye}`));
  if (filteredChannels == null) return;
  var channel = filteredChannels[1]
  if (channel.topic == null) return;


  // get settings and var  
  const ISembed = channel.topic.includes('{embed}')
  const topic = channel.topic
  const IScustommsg = topic.match(/\{message:(.*?)\}/g);

  if (IScustommsg == null) {
    var msg = `Goodbye, ${member.displayName}`
  } else {
    const [custommsg] = topic.match(/\{message:(.*?)\}/g);
    var msg = custommsg.replace(/\<displayName\>/g, member.displayName).replace(/\<username\>/g, member.user.username).replace(/\<tag\>/g, member.user.discriminator).slice(9, -1);
  }

  if (ISembed) {
    const embed = new EmbedBuilder()
      .setColor(`${hex}`)
      .setTimestamp()
      .setDescription(msg)
    // ,
    //        { name: `NAME`, value: `DESCTIPT`, inline: true }

    let pfplink = member.displayAvatarURL({ format: "png" })
    if (isValidImageURL(pfplink)) {
      embed.setAuthor({ name: `${member.displayName}`, iconURL: pfplink })

    } else {
      embed.setAuthor({ name: `${member.displayName}` })
    }
      channel.send({ embeds: [embed] })
  } else {
    channel.send({ content: msg })
  }
})