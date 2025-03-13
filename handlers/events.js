const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('│', '⎯', "┬", "┴")

const { Webhook, MessageBuilder } = require('discord-webhook-node');

// Get Config from .env
const logWH = process.env.LOGURL

module.exports = (client) => {
  const log = client.log;
    const dlog = new Webhook(logWH);
  dlog.setUsername('BetterLogs');
  const embed = new MessageBuilder() // Create Styled embed
    .setTitle('Events')
    .setColor("#f8a532");
  
    const eventsPath = path.join(__dirname, '..', 'events');
    fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`${eventsPath}/${event}`);
	table.addRow(event.split('.js')[0], '✅')
  embed.addField(`<:Enabled:992541963721117696>${event.split('.js')[0]}`, `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
  
    })
	console.log(chalk.greenBright(table.toString()))
  dlog.send(embed); // send embed to webhook
};
