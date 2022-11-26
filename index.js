const { Client, Collection, WebhookClient, MessageEmbed } = require("discord.js");
// Import Discord.Js.
const client = new Client({ disableMentions: "everyone", intents: 32767 });
module.exports = client;
// Export Client To Give Other Files Access.
const chalk = require("chalk");
// Import Chalk
const path = require("path");
// Import Path

// ———————————————[Global Variables]———————————————
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/settings.json");
require("./handler")(client);

// ———————————————[MYSQL]———————————————
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: client.config.sql.host,
    user: client.config.sql.user,
    password: client.config.sql.password,
    database: client.config.sql.database
});
client.sqlconn = connection;

// Initializing the project.

// ———————————————[Logging Into Client]———————————————
const token = process.env["clienttoken"] || client.config.clienttoken;
if(token === ""){
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Invalid Token")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(chalk.magenta("There Are 3 Ways To Fix This"));
   console.log(
      chalk.blue("Put Your ") + chalk.red("Bot Token ") + chalk.blue("in:")
   );
   console.log(
      chalk.yellow.bold("1.) ") +
         chalk.cyan("index.js") +
         chalk.gray(
            " On the client.login line remove client.login(token) and write client.login('Your token')"
         )
   );
   console.log(
      chalk.yellow.bold("2.) ") +
         chalk.cyan("ENV/Secrets") +
         chalk.gray(
            " If using replit, make new secret named 'clienttoken' and put your token in it else, if your using VsCode, Then Follow Some ENV tutorials (I don't suggest using it in VSC)"
         )
   );
   console.log(
      chalk.yellow.bold("3.) ") +
         chalk.cyan("settings.json ") +
         chalk.gray(
            'Go To config/settings.json, Find The Line with client.token and put "client.token":"Your Bot Token"'
         )
   );
} else {
    client.login(token);
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {

   if (reason.toLocaleString() === "Error [INTERACTION_ALREADY_REPLIED]: The reply to this interaction has already been sent or deferred.") return;

   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {

   if (reason.toLocaleString() === "Error: Cannot perform IP discovery - socket closed") return;
   if (reason.toLocaleString() === "AbortError: The operation was aborted") return;

   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Multiple Resolves")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(type, promise, reason);
});