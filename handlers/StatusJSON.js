const client = require('../bot.js');

async function getStatus() {
  try {
    const serverOnline = true;

    // Get bot ping
    const botPing = client.ws.ping;

    return {
      botOnline: client.readyAt !== null,
      serverOnline,
      botPing,
    };
  } catch (error) {
    console.error(error);
    return {
      botOnline: false,
      serverOnline: false,
      botPing: null,
    };
  }
}

module.exports = getStatus;