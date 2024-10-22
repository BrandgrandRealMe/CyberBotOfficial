require("dotenv").config();

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const path = require('path');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});
const logurl = process.env['CYBERBOT_LOGURL']
const fs = require('fs');
const config = require('./config.json');
const bl = require('betterdevlogs'); // ./log.js
const log = bl({ logfolder: 'logs', webhook: logurl});
const Database = require("@replit/database")
const db = new Database()


log.quiet("hey!")

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;
client.config = config;
client.log = log;
client.db = db;
client.supportinv = "https://discord.gg/Bm6fMsA";

module.exports = client;



fs.readdirSync('../handlers').forEach((handler) => {
  require(`../handlers/${handler}`)(client)
});



client.login(process.env.CYBERBOT_TOKEN); client.starttime = performance.now();
client.on("warn", log.warn)
//client.on("debug", log.quiet)
client.on("error", log.error)
client.on("invalidated", log.warn)
client.on("invalidRequestWarning", log.warn)
client.on("rateLimit", log.warn)

process.on("unhandledRejection", (reason, p) => {
  log.error(" [Error_Handling] :: Unhandled Rejection/Catch");
  log.error(reason, p);
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch");
  log.error(err, origin);
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  log.error(err, origin);
  console.log(err, origin);
});
