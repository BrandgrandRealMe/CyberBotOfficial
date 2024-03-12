const dbots = require('dbots')

const keys = { topgg: process.env['TOPGGKEY'] }
module.exports = (client) => {
  log = client.log
  const poster = new dbots.Poster({
    client,
    apiKeys: {
      topgg: keys.topgg
    },
    clientLibrary: 'discord.js'
  })
  log.server("Loaded dbots.js")
    // Starts an interval thats posts to all services every 30 minutes.
  poster.startInterval()
}