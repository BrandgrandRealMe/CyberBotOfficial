import server from '../handlers/ExpressServer.js';
const { ActivityType } = require('discord.js');
const client = require('..');
const db = client.db

const chalk = require('chalk');
function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}


const log = client.log;
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}
function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}




client.on("ready", () => {
  // Clear the timer if the bot has logged in before it expires
  clearTimeout(loginTimer);
  const readytime = performance.now();
  
  log.info(`Ready Time: ${readytime - client.starttime} ms`);
  

  
  // all the boot/ready database stuff
  db.get("bootTimes").then(value => {
    if (value == null) {
      let bootTimes = []
      bootTimes.push(readytime - client.starttime)
      db.set("bootTimes", bootTimes).then(() => {
      //  console.log("Created bootTimes!")
      });
    }
    else {
      db.get("bootTimes").then(value => {
        value.push(readytime - client.starttime)
        db.set("bootTimes", value).then(() => {
        //  console.log("Updated bootTimes!")
        });
      });
    }
  });





  var statuslists = list()
  function list() {
    return {
      "default": [
        { name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
        { name: `${client.channels.cache.size} Channels`, type: ActivityType.Playing },
        { name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
        { name: `Discord.js v14`, type: ActivityType.Competing }
      ],
      "defaultfun": [
        { name: `Eating virtual pretzels 🥨`, type: ActivityType.Listening },
        { name: `Doing the robot 🤖`, type: ActivityType.Competing },
        { name: `🧑‍✈️ Learning to fly`, type: ActivityType.Competing },
        { name: `and Thinking deep thoughts 🤯`, type: ActivityType.Listening },
        { name: `Trying to take over the world 🌐`, type: ActivityType.Competing },
        { name: `🤫 Working on a secret project 🤫`, type: ActivityType.Playing },
        { name: `Sorting virtual socks 🧦`, type: ActivityType.Listening },
        { name: `Building a time machine ⌚`, type: ActivityType.Listening },
        { name: `Solving virtual mysteries 🔮`, type: ActivityType.Competing },
        { name: `Inventing virtual gadgets ⚒️`, type: ActivityType.Listening }

      ],
      "xmas": [
        { name: `It’s the Most Wonderful Time of the Year`, type: ActivityType.Listening },
        { name: `We Wish You A Merry Christmas`, type: ActivityType.Listening },
        { name: `🎄 Merry Christmas 🎄`, type: ActivityType.Listening }
      ],
      "xmasmusic": [
        { name: `You’re a Mean One, Mr. Grinch`, type: ActivityType.Listening },
        { name: `🎶🔔 Jingle Bells`, type: ActivityType.Listening },
        { name: `Sleigh Ride`, type: ActivityType.Listening },
        { name: `☃️ Let It Snow 🌨️`, type: ActivityType.Listening },
        { name: `Do You Hear What I Hear?`, type: ActivityType.Listening },
        { name: `Baby, It’s Cold Outside`, type: ActivityType.Listening },
        { name: `Up On the Housetop`, type: ActivityType.Listening },
        { name: `O, Little Town of Bethlehem`, type: ActivityType.Listening },
        { name: `🗻 Go Tell It On the Mountain`, type: ActivityType.Listening },
        { name: `🌃 O Holy Night`, type: ActivityType.Listening },
        { name: `🥁 Little Drummer Boy`, type: ActivityType.Listening }
      ],
      "xmaseve": [
        { name: `🎅 Santa Claus is Coming to Town`, type: ActivityType.Listening },
        { name: `🎅 Here Comes Santa Claus`, type: ActivityType.Listening },
        { name: `❤️ Run Rudolph Run`, type: ActivityType.Listening },
        { name: `🎄 IT'S Christmas Eve!`, type: ActivityType.Listening }
      ],
      "newyear": [
        { name: `Happy new year's 🎇`, type: ActivityType.Listening }
      ]
    }
  }
  function getlist() {
    let today = new Date()
    if (today.getMonth() === 11 && today.getDate() === 24) {
      return statuslists.xmaseve
    } else if (today.getMonth() === 11 && today.getDate() === 25) {
      return statuslists.xmas
    } else if (today.getMonth() === 1 && today.getDate() === 1) {
      return statuslists.newyear
    } else {
      return statuslists.defaultfun
    }
  }

  async function statusroll(i, f) {
    const factivities = getlist()

    client.user.setActivity(statuslists.default[i])
    await sleep(15000)

    client.user.setActivity(factivities[f])


    await sleep(15000)
  }
  const factivities = getlist()
  let i = 0
  let f = generateRandomInteger(0, factivities.length);
  statusroll(i, f)
  i = 1
  setInterval(() => {
    var statuslists = list()
    const factivities = getlist()
    let f = generateRandomInteger(0, factivities.length);
    if (i >= statuslists.default.length) i = 0
    statusroll(i, f)
    i++;
  }, 2 * 15000);


  log.info(`Logged in as ${client.user.tag}!`)


});

const loginTimer = setTimeout(() => {
  console.log('ERROr ');
exec(`kill 1`)
}, 300000);