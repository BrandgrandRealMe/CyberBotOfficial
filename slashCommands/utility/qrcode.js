const QRCode = require('qrcode');
const tmp = require('temp');
const request = require('request');


const { EmbedBuilder, ApplicationCommandType } = require('discord.js');




const owner = "531186390717825074"
module.exports = {
  name: 'qrcode',
  description: "Scan or Create A QRCode",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'EmbedLinks', // permission required
  options: [
    {
      name: 'create',
      description: 'create a QR code!',
      type: 1,
      options: [
        {
          name: 'data',
          description: 'What to put in QR code',
          type: 3,
          required: true
        }
      ]
    },
    {
      name: 'scan',
      description: 'scan a QR code!',
      type: 1,
      options: [
        {
          name: 'qr',
          description: 'Add the QR code you want to scan',
          type: 11,
          required: true
        }
      ]
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const config = client.config
    const color = config.color.HEX
    if (interaction.options._subcommand === 'create') {

      const Path = tmp.path({ suffix: '.png' });
      const File = Path.replace(/\/tmp\//g, `qrCode`);
      const data = interaction.options.get('data')
      QRCode.toFile(Path, [{ data: data.value, mode: 'byte' }], { margin: 1 }, (error) => {
        if (error) {
          console.log(error);
          return interaction.editReply({ content: `Sorry, I failed! /n ERROR: ${error}`, ephemeral: true });
        } else {
          // Send the QR code as an image in the channel
          interaction.editReply({
            files: [{
              attachment: Path,
              name: File
            }]
          });
        }
      });
    } else if (interaction.options._subcommand === 'scan') {
      const attachment = interaction.options.getAttachment('qr')

      const loading = new EmbedBuilder()
        .setTitle('Scanned QR Code Data')
        .setDescription(`Scanning...`)
        .setColor(color)

      const image = attachment.url
      if (image !== undefined) {
        const imageURI = encodeURI(image);
        request({ uri: `https://api.qrserver.com/v1/read-qr-code/?fileurl=${imageURI}`, json: true }, (error, response, body) => {
          if (body[0].symbol[0].error === null) {
            const data = new EmbedBuilder()
              .setTitle('Scanned QR Code Data')
              .setDescription(`${body[0].symbol[0].data}`)
              .setColor(color)

            interaction.editReply({ embeds: [data], ephemeral: false })
          } else {
            return interaction.editReply({ content: `there was an error while reading the QR code.`, ephemeral: true })
          }
        });
      }
    }



  }
};
