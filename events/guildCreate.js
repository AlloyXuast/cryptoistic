const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');
const fetch = require('node-fetch');

const connection = client.sqlconn;

function getGuildBlackList(guildID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM guild_blacklist WHERE guild_id = '${guildID}'`, (err, rows) => {
            if (err) return reject(err);
 
            resolve(rows);
        });
    });
}

client.on("guildCreate", async(guild) => {

    const [guildBlacklist] = await getGuildBlackList(guild.id) // destructuring 'rows' array
    .catch(console.error);

    if (guildBlacklist == undefined) {

    var discordusername = guild.name;
    var boop = discordusername.replace(/[\u0800-\uFFFF]/g, '')
    var dusers = boop.replace(`'`, '')

    connection.query(`SELECT guild_id FROM guilds WHERE guild_id='${guild.id}'`, async function(err, results) {

      if (results.length === 0) {

          connection.query(`
          INSERT INTO guilds SET name = '${dusers}', guild_id = '${guild.id}', owner_id = '${guild.ownerId}', region='discontinued'`,  err => {
              if (err) throw err;

              console.log("[AUTOMOD] Discord Server been Addded to Database");
          });

          connection.query(`
          INSERT INTO guild_settings SET guild_id = '${guild.id}', prefix='/', welcome_msg='N/A', leave_msg='N/A'`, err => {
              if (err) throw err;

              console.log("[AUTOMOD] Discord Server Settings been Addded to Database");
          })

          connection.query(`
          INSERT INTO guild_command_toggle SET guild_id = '${guild.id}'`, err => {
              if (err) throw err;

              console.log("[AUTOMOD] Discord Server Settings been Addded to Database");
          });
      } else {

           console.log(`${guild.name} ALREADY ADDED, SKIPPED!`);
      }
    });
    } else {
        if (guildBlacklist.active == 1) return client.guilds.cache.get(guild.id).leave().catch(err => { console.log(`there was an error leaving the guild: \n ${err.message}`); })
    }
});