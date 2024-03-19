require("dotenv").config();

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
var http = require('http'); 
http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080);

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
const logurl = process.env['LOGURL']
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



fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});



client.login(process.env.TOKEN); client.starttime = performance.now();
client.on("warn", log.warn)
//client.on("debug", log.quiet)
client.on("error", log.error)
client.on("invalidated", log.warn)
client.on("invalidRequestWarning", log.warn)
client.on("rateLimit", log.warn)


