const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');
const fetch = require('node-fetch');

const { version: discordjsVersion, MessageEmbed, WebhookClient } = require("discord.js");
const hive = require('@hiveio/hive-js');
const { ChainTypes, makeBitMaskFilter } = require('@hiveio/hive-js/lib/auth/serializer');

const blurt = require("@blurtfoundation/blurtjs");
const steem = require('@steemit/steem-js');

hive.api.setOptions({ url: 'https://rpc.ecency.com' });

const main_json = require("../config/settings.json");

let GuildChis;
let ChannelChis;

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const characters ='abcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.replace(/ /g, '');
}

client.on("ready", async () => {
    var connection = client.sqlconn;

    GuildChis = client.guilds.cache.get("1045725462959226902");
    if (GuildChis) {
        ChannelChis = GuildChis.channels.cache.get("1045725464431431752");
    }

    console.log("");
    console.log(chalk.red.bold("———————————————[Ready MSG]———————————————"));

    if (!ChannelChis) {
        console.log("");
        console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
        console.log(
            chalk.gray(
                `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.`
            )
        );
    } else {
        console.log("");
        console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
        console.log(
            chalk.gray(
                `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] ${client.user.username} Discord BOT Ready Chis Discord!`
            )
        );
        botReady = true;
    }
    const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————

  client.user.setActivity(`STARTING UP... || cryptoistic BOT || LOADING COMMANDS / MODULES`,
  { type: "WATCHING" })

        setInterval(() => {

            client.user.setActivity(`/help || RAWR! || IM BIG CUTIE`,
                { type: "WATCHING" })

            setTimeout(function() {
                client.user.setActivity(`/help || NEKO CRYPTO BOT || MY MASTER IS A CUTIE!`,
                { type: "WATCHING" })
             }, 10000)

        }, 20000)
        setInterval(() => {
          connection.query(`SELECT * FROM guilds`);
        }, 10000)

        function getBlacklistServers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }
    
        function getBlacklistUsers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM profile_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }

        const BlacklistServers = await getBlacklistServers().catch(console.error);
    const BlacklistUsers = await getBlacklistUsers().catch(console.error);

    if (BlacklistServers.length == 0) {
        var blockservers = 0;
    } else {
       var blockservers = BlacklistServers.length;
    }

    if (BlacklistUsers.length == 0) {
        var blockusers = 0;
    } else {
       var blockusers = BlacklistUsers.length;
    }

  // ———————————————[Ready MSG]———————————————
  console.log("");

  console.log(`
    ${chalk.grey('--------------------------------------------------')}
        NEKO BOT, an open-source, multi-platform bot.
        ${chalk.red('PLEASE DO NOT SELL THIS BOT/SOURCE TO OTHER PEOPLE')}
        ${chalk.red('PLEASE DO NOT SELL THE BOT FOR SERVICE.')}
        BOTS: ${chalk.cyan('Discord BOT V13')}
    ${chalk.grey('--------------------------------------------------')}
  `);

  console.log(chalk.red.bold("——————————[BOT DETAILS]——————————"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers," : "Server,"}`),
    chalk.red(`${blockusers}`),
    chalk.white(`${blockusers > 1 ? "Blocked Users," : "Blocked User,"}`),
    chalk.red(`${blockservers}`),
    chalk.white(`${blockservers > 1 ? "Blocked Servers." : "Blocked Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` /`)),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Slash Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});
