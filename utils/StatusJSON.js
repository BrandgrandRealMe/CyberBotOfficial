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
      botOnline: unknown,
      serverOnline: unknown,
      botPing: unknown,
    };
  }
}

module.exports = getStatus;