const { EmbedBuilder, ButtonEmojis } = require('discord.js');
function average(nums) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}
module.exports = {
  name: 'boot',
  description: "Get boot info",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    const config = client.config
    const color = config.color.HEX
    const db = client.db

    if (args[0] == "timeDB") {
      if (args[1] == "~reset") {
        db.delete("bootTimes").then(() => { });
        return message.channel.send(`Deleted database!`)
      } else {
        db.get("bootTimes").then(value => {
          if (value == null) {
            return message.channel.send(`No data!`)
          }
          else {
            const thing = value // 
            thing.splice(10);
            const ARR = value.map(x => x + " ms");
            const STRING = ARR.toString();
            const STR = STRING.split(",", 10).toString();
            const list = STR.replace(/,/g, "\n");
            const embed = new EmbedBuilder()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(`Database of the boot times!`)
              .setFooter({ text: `Average Boot Time: ${average(thing)}` })
              .setDescription(list)
              .setTimestamp()
              .setColor(color);
            return message.channel.send({ embeds: [embed] })


          }
        });
      }

    } else if (args[0] == "help") {
      const embed = new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(`Get Boot info!`)
        .setDescription("`timeDB` - Get a Database of the boot times! (Time to login)\n > `~reset` - Delete the database")
        .setTimestamp()
        .setColor(color);
      return message.channel.send({ embeds: [embed] })
    }

  }
};
