function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}
module.exports = {
  name: 'bot',
  description: "control the bot",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    log = client.log;
    log.debug(args)
    if (args == `kill`) {
       await message.channel.send(`Restarting Bot!`)
       return exec(`kill 1`)
    }
    if (args[0] == `log`) {
      let msg = args.join(" ").replace(`${args[0]} `,'');
       await message.channel.send(`Sending \`${msg}\` to Log!`)
       return log.debug(msg)
    }
  }
};
