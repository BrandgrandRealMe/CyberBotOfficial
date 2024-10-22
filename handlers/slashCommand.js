const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const config = require('../config.json');




const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Status').setBorder('│', '⎯', "┬", "┴")

const { Webhook, MessageBuilder } = require('discord-webhook-node');

// Get Config from .env
const logWH = process.env.CYBERBOT_LOGURL
const TOKEN = process.env.CYBERBOT_TOKEN;
const CLIENT_ID = process.env.CYBERBOT_CLIENT_ID;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
  log = client.log
  const slashCommands = [];
  // Setup Webhooks
  const dlog = new Webhook(logWH);
  dlog.setUsername('BetterLogs');
  const embed = new MessageBuilder() // Create Styled embed
    .setTitle('Slash Commands')
    .setColor("#f8a532");


  const slashCommandsPath = path.join(__dirname, 'slashCommands');
  fs.readdirSync(slashCommandsPath).forEach(async dir => {
    const files = fs.readdirSync(`${slashCommandsPath}/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const slashCommand = require(`${slashCommandsPath}/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
      });

      if (slashCommand.name) {
        client.slashCommands.set(slashCommand.name, slashCommand)
        table.addRow(file.split('.js')[0], '✅')
        embed.addField(`<:Enabled:992541963721117696> ${file.split('.js')[0]}`, `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
      } else {
        table.addRow(file.split('.js')[0], '⛔')
        embed.addField(`<:Disabled:992541962802573362> ${file.split('.js')[0]}`, `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
      }
    }

  });
  table.setAlign(1, AsciiTable.CENTER)
  console.log(chalk.red(table.toString()));
  dlog.send(embed); // send embed to webhook

  (async () => {
    try {
      await rest.put(
        process.env.CYBERBOT_GUILD_ID ?
          Routes.applicationGuildCommands(CLIENT_ID, process.env.CYBERBOT_GUILD_ID) :
          Routes.applicationCommands(CLIENT_ID),
        { body: slashCommands }
      );
      log.server('Slash Commands • Registered')
    } catch (error) {
      log.error(error);
    }
  })();
};
