import { client } from "../index.js";

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
      botOnline: unkown,
      serverOnline: unkown,
      botPing: unkown,
    };
  }
}

module.exports = getStatus;