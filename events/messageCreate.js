const client = require("../index");
const { MessageEmbed } = require("discord.js");
const { clientavatar } = require("../config/settings.json");
const { clientname } = require("../config/settings.json");
const connection = client.sqlconn;

function getGuild(guildID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM guild_settings WHERE guild_id = '${guildID}'`, (err, rows) => {
            if (err) return reject(err);
 
            resolve(rows);
        });
    });
 }
 
 function getGuildBlackList(guildID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM guild_blacklist WHERE guild_id = '${guildID}'`, (err, rows) => {
            if (err) return reject(err);
 
            resolve(rows);
        });
    });
 }
 
 function getUserBlackList(guildID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM guild_settings WHERE guild_id = '${guildID}'`, (err, rows) => {
            if (err) return reject(err);
 
            resolve(rows);
        });
    });
 }
 
 function getGuildToggle(guildID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
            if (err) return reject(err);
 
            resolve(rows);
        });
    });
 }

 client.on("messageCreate", async (message) => {
    var discordusername = message.guild.name;
    var boop = discordusername.replace(/[\u0800-\uFFFF]/g, '')
    var dusers = boop.replace(`'`, '')

    connection.query(`SELECT guild_id FROM guilds WHERE guild_id='${message.guild.id}'`, async function(err, results) {

        if (results.length === 0) {

            connection.query(`
            INSERT INTO guilds SET name = '${dusers}', guild_id = '${message.guild.id}', owner_id = '${message.guild.ownerId}', region='discontinued'`,  err => {
                if (err) throw err;

                console.log("[AUTOMOD] Discord Server been Addded to Database");
            });

            connection.query(`
            INSERT INTO guild_settings SET guild_id = '${message.guild.id}', prefix='${client.config.prefix}', welcome_msg='N/A', leave_msg='N/A'`, err => {
                if (err) throw err;

                console.log("[AUTOMOD] Discord Server Settings been Addded to Database");
            })

            connection.query(`
            INSERT INTO guild_command_toggle SET guild_id = '${message.guild.id}'`, err => {
                if (err) throw err;

                console.log("[AUTOMOD] Discord Server Settings been Addded to Database");
            });
        } else {
            const [guildsettings] = await getGuild(message.guild.id) // destructuring 'rows' array
                .catch(console.error);
 
            const [guildsettingstoggle] = await getGuildToggle(message.guild.id) // destructuring 'rows' array
                .catch(console.error);
 
            if (guildsettingstoggle == undefined) return console.log("DOESNT ESIST SERVER, ADDIGN NOW")
            if (guildsettings == undefined) return console.log("DOESNT ESIST SERVER, ADDIGN NOW")
             
            const [guildBlacklist] = await getGuildBlackList(message.guild.id) // destructuring 'rows' array
                .catch(console.error);
                
            if (guildBlacklist == undefined) {
                return;
            } else {
                if (guildBlacklist.active == 1) {
                    if (message.author.bot) return;
                    let discordsrvbl_embed = new MessageEmbed()
                    .setTitle(`:x: | This Server is Blacklist!`)
                    .setColor("RED")
                    .addField("Reason:", guildBlacklist.message)
                    .addField("NOTE:", "If this was False Guild Blacklist, Contact `ChisVR#7172`, right now BOT has Left Server and been Logged our Database Reason.")
                    .setFooter(`${clientname}`, `${clientavatar}`)
                    .setTimestamp();
                    message.channel.send({ embeds: [discordsrvbl_embed] });
                    client.guilds.cache.get(message.guild.id).leave().catch(err => { console.log(`there was an error leaving the guild: \n ${err.message}`); })
                }
            }

            if (message.author.bot || !message.guild) return;
        }
    });

 });