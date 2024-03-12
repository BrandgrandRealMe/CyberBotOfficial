const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
  name: 'purge',
  description: "Delete Up To 100 (younger then 2 weeks) Messages!",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'ManageMessages', // permission required
  options: [
    {
      name: 'amount',
      description: 'How many messages to delete',
      type: 10,
      min_value: 1,
      max_value: 100,
      required: true
    }
  ],
  run: async (client, interaction) => {
    
    const amount = interaction.options.getNumber('amount')
    const config = client.config
    const color = config.color.HEX
    const msgsd = 0
    interaction.channel.bulkDelete(parseInt(amount), true).then(async res => {
      await interaction.deferReply();
      const msgsd = res.size

    await interaction.editReply({ content: " Deleted " + msgsd + ` Out of ` + amount + " Messages!", ephemeral: true })

    })
  }
};
