const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
log = client.log
client.on("guildMemberAdd", member => { //usage of welcome event
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
  const [filteredChannels] = channels.filter(channel => channel.topic && channel.topic.includes(`{welcome}`));
  if (filteredChannels == null) return;
  var channel = filteredChannels[1]
  if (channel.topic == null) return;


  // get settings and var  
  const ISembed = channel.topic.includes('{embed}') || channel.topic.includes('{embed:Mention}')
  const ISembedMention = channel.topic.includes('{embed:Mention}')
  const topic = channel.topic
  const IScustommsg = topic.match(/\{message:(.*?)\}/g);

  if (IScustommsg == null) {
    var msg = `Welcome to the server, ${member}`
  } else {
    const [custommsg] = topic.match(/\{message:(.*?)\}/g);
    var msg = custommsg.replace(/\<mention\>/g, member).replace(/\<displayName\>/g, member.displayName).replace(/\<username\>/g, member.user.username).replace(/\<tag\>/g, member.user.discriminator).slice(9, -1);
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
    if (ISembedMention) {
      channel.send({ content: `${member}`, embeds: [embed] })
    } else {
      channel.send({ embeds: [embed] })
    }
  } else {
    channel.send({ content: msg })
  }
})