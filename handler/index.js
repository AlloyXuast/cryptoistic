const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const mainjson = require("../config/settings.json");
const chalk = require("chalk");

module.exports = async (client) => {
  // ———————————————[Events]———————————————
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // ———————————————[Slash Commands]———————————————
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    const properties = { directory, ...file };
    client.slashCommands.set(file.name, properties);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    // Register for a single guild
    if (mainjson.TestingServerID === "Your Server ID") {
      console.log(chalk.gray("—————————————————————————————————"));
      console.log(
        chalk.white("["),
        chalk.red.bold("AntiCrash"),
        chalk.white("]"),
        chalk.gray(" : "),
        chalk.white.bold("Couldn't Find ServerID to set the Slash Cmds")
      );
      console.log(chalk.gray("—————————————————————————————————"));
      console.log(chalk.magenta("Please Fix it with following methods."));
      console.log(
        chalk.yellow.bold("1.) ") +
          chalk.cyan("Go to ") +
          chalk.red.underline("config/settings.json") +
          chalk.cyan(" and put your \nSupportServer/TestServer ID in the") +
          chalk.red(" TestingServerID String!")
      );
      console.log(
        chalk.yellow.bold("2.) ") +
          chalk.cyan("Use Global Slash Commands by changing line no 74 to\n") +
          chalk.blue.bold.underline(
            " await client.application.commands.set(arrayOfSlashCommands);\n"
          ) +
          chalk.cyan(" in the else statement.")
      );
    } else {
      //await client.guilds.cache.get(mainjson.TestingServerID).commands.set(arrayOfSlashCommands);

      // Register for all the guilds the bot is in
       await client.application.commands.set(arrayOfSlashCommands);
    }
  });
};