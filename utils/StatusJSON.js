const client = require("../index.js");

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
<<<<<<< HEAD
      botOnline: unknown,
      serverOnline: unknown,
      botPing: unknown,
=======
      botOnline: "unknown",
      serverOnline: "unknown",
      botPing: "unknown",
>>>>>>> dc91b0aede78032727076fc48576bfbe7c8e8356
    };
  }
}

module.exports = getStatus;