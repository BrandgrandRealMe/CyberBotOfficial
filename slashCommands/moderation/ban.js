const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
  name: 'ban',
  description: "Use the Ban Hammer",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'BanMembers', // permission required
  options: [
    {
      name: 'user',
      description: 'The user you want to ban.',
      type: 6,
      required: true
    },
    {
      name: 'reason',
      description: 'Set the reason for the ban',
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    try {

      const config = client.config
      const color = config.color.HEX
      const RAWr = interaction.options.get('reason')
      const user = interaction.options.get('user') ?.user;
      const member = interaction.options.getMember('user')
      if (user === interaction.user) return interaction.reply({ content: 'You can\'t ban yourself', ephemeral: true }); // Check if the user mention or the entered userID is the message author himsmelf
      if (!member) return interaction.reply({ content: `Please mention a valid member of this server`, ephemeral: true });
      if (!member.bannable) return interaction.reply({ content: "I cannot ban this member!", ephemeral: true });
      const r = RAWr.value

      const embed = new EmbedBuilder()
        .setTitle(`Banned ${user.tag}`)
        .setDescription(`Reason: ${r}`)
        .setColor(color)
        .setTimestamp();
      const embed2 = new EmbedBuilder()
        .setTitle(`You were banned from "${member.guild}"`)
        .setDescription(`Reason: ${r}`)
        .setColor(color)
        .setTimestamp();



      await interaction.reply({ embeds: [embed], ephemeral: true });
      await member.send({ embeds: [embed2] });
      return member.ban({ reason: r }) // Bans the user


    } catch (err) {
      console.log(err)
      return interaction.reply({ content: `ERROR: ${err}`, ephemeral: true });
    }
  }
};
