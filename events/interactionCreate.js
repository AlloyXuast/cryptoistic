const client = require("../index");
const ms = require("ms");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require('node-fetch')
const RPCClient = require('@jskitty/bitcoin-rpc');

let pivx = new RPCClient(client.config.walletnodes.pivx.user, client.config.walletnodes.pivx.pass, client.config.walletnodes.pivx.ip, client.config.walletnodes.pivx.port);
let znz = new RPCClient(client.config.walletnodes.znz.user, client.config.walletnodes.znz.pass, client.config.walletnodes.znz.ip, client.config.walletnodes.znz.port);
let dogec = new RPCClient(client.config.walletnodes.dogec.user, client.config.walletnodes.dogec.pass, client.config.walletnodes.dogec.ip, client.config.walletnodes.dogec.port);
let fls = new RPCClient(client.config.walletnodes.fls.user, client.config.walletnodes.fls.pass, client.config.walletnodes.fls.ip, client.config.walletnodes.fls.port);


const { developerID } = require("../config/settings.json");
const { clientavatar } = require("../config/settings.json");
const { clientname } = require("../config/settings.json");
const connection = client.sqlconn;

client.on("interactionCreate", async (interaction) => {

   // ———————————————[Slash Commands]———————————————
   if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: true }).catch(() => {});

      const cmd = client.slashCommands.get(interaction.commandName.toLowerCase());
      if (!cmd)
         return interaction.followUp({ content: "An error has occured " });

      const args = [];

      for (let option of interaction.options.data) {
         if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
               if (x.value) args.push(x.value);
            });
         } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
         interaction.user.id
      );
      
      if (cmd && cmd.voiceChannel) {
        if (!interaction.member.voice.channel) return interaction.followUp({ content: `You are not connected to an audio channel. ❌`, ephemeral: true});
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: `You are not on the same audio channel as me. ❌`, ephemeral: true});
      }

   if (cmd.toggleOff) {
      let toggleoff_embed = new MessageEmbed()
         .setTitle(
            `:x: | That Command Has Been Disabled By The Developers! Please Try Later.`
         )
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [toggleoff_embed] });
   } else if (!interaction.member.permissions.has(cmd.userpermissions || [])) {
      let userperms_embed = new MessageEmbed()
         .setTitle(`:x: | You Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [userperms_embed] });
   } else if (!interaction.guild.me.permissions.has(cmd.botpermissions || [])) {
      let botperms_embed = new MessageEmbed()
         .setTitle(`:x: | I Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [botperms_embed] });
   } else if (cmd.developersOnly) {
      if (!developerID.includes(interaction.member.id)) {
         let developersOnly_embed = new MessageEmbed()
            .setTitle(`:x: | Only Developers Can Use That Command!`)
            .setDescription(
               `Developers: ${developerID.map((v) => `<@${v}>`).join(",")}`
            )
            .setColor("RED")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
         return interaction.followUp({ embeds: [developersOnly_embed] });
      }
   } else if (cmd.cooldowns) {
      if (client.cooldowns.has(`${cmd.name}${interaction.member.id}`)) {
         let cooldown_embed = new MessageEmbed()
            .setTitle(
               `${
                  randomMessages_Cooldown[
                     Math.floor(Math.random() * randomMessages_Cooldown.length)
                  ]
               }`
            )
            .setDescription(
               `You Need To Wait \`${ms(
                  client.cooldowns.get(`${cmd.name}${interaction.member.id}`) -
                     Date.now(),
                  { long: true }
               )}\` To Use \`/${cmd.name}\` again!`
            )
            .setColor("BLUE")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();

         return interaction.followUp({ embeds: [cooldown_embed] });
      }

      client.cooldowns.set(
         `${cmd.name}${interaction.member.id}`,
         Date.now() + cmd.cooldowns
      );

      setTimeout(() => {
         client.cooldowns.delete(`${cmd.name}${interaction.member.id}`);
      }, cmd.cooldowns);
   }

      cmd.run(client, interaction, args);
   }
   // ———————————————[Buttons]———————————————
   if (interaction.isButton()) {

      if (interaction.customId.includes('-walletexport')) {
         if (interaction.customId.includes('yes')) {
            connection.query(`SELECT * FROM profile_wallet WHERE userid='${interaction.user.id}'`, async function(err, results) {
               if (results.length === 0) {
                  return await interaction.reply({ ephemeral: true, content: 'You dont have a Wallet, Please do `/createwallet` to Create Address and Balance and Staking'});
               } else {
                  var exportpivx = await pivx.call('dumpprivkey', results[0].pivx);
                  var exportznz = await znz.call('dumpprivkey', results[0].znz);
                  var exportdogec = await dogec.call('dumpprivkey', results[0].dogec);
                  var exportfls = await fls.call('dumpprivkey', results[0].fls);

                  let embed = new MessageEmbed();
                  embed.setColor(0x9900FF)
                  embed.setTitle("Crypto Wallets")
                  embed.setDescription(
                    `PIVX WALLET:\n**${exportpivx}**\n\n` +
                    `ZENZO WALLET:\n**${exportznz}**\n\n` +
                    `DOGECASH WALLET:\n**${exportdogec}**\n\n` +
                    `FLITS WALLET:\n**${exportfls}**\n\n`
                  )
                  embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                  embed.setTimestamp()

                  await interaction.reply({ ephemeral: true, content: 'I HAVE EXPORTED YOUR KEYS, PLEASE BACKUP THEM. AFTER YOU DONE CLICK ON DISMISS MESSAGE BELOW AS PREVIEW HERE REMOVE KEYS. https://cdn.discordapp.com/attachments/657977441012154381/1045814598240063528/image.png', embeds: [embed]})
               }
            });
         } else if (interaction.customId.includes('no')) {
            await interaction.reply({ ephemeral: true, content: 'I have canceled your Exporting Wallet, if want do it again just send `/exportwallet`'})
         }
      } else if (interaction.customId.includes('-walletcreate')) {
         if (interaction.customId.includes('yes')) {
            connection.query(`SELECT * FROM profile_wallet WHERE userid='${interaction.user.id}'`, async function(err, results) {
               if (results.length === 0) {
                  await interaction.reply({ ephemeral: true, content: 'I have just Created your Wallet, Please do `/wallet` See your Address and Balance and Staking'})
                  var walletpivx = await pivx.call('getnewaddress', interaction.user.id);
                  var cswalletpivx = await pivx.call('getnewstakingaddress', interaction.user.id);

                  var walletznz = await znz.call('getnewaddress', interaction.user.id);
                  var cswalletznz = await znz.call('getnewstakingaddress', interaction.user.id);

                  var walletdogec = await dogec.call('getnewaddress', interaction.user.id);
                  var cswalletdogec = await dogec.call('getnewstakingaddress', interaction.user.id);

                  var walletfls = await fls.call('getnewaddress', interaction.user.id);
                  var cswalletfls = await fls.call('getnewstakingaddress', interaction.user.id);

                  console.log(`PIVX:\nUSER: ${interaction.user.id}\nWALLET: ${walletpivx}\nCOLDSTAKING ADDRESS: ${cswalletpivx}`)
                  console.log(`ZNZ:\nUSER: ${interaction.user.id}\nWALLET: ${walletznz}\nCOLDSTAKING ADDRESS: ${cswalletznz}`)
                  console.log(`DOGEC:\nUSER: ${interaction.user.id}\nWALLET: ${walletdogec}\nCOLDSTAKING ADDRESS: ${cswalletdogec}`)
                  console.log(`FLS:\nUSER: ${interaction.user.id}\nWALLET: ${walletfls}\nCOLDSTAKING ADDRESS: ${cswalletfls}`)

                  connection.query(`
                     INSERT INTO profile_coldstakingwallet SET userid = '${interaction.user.id}', znz = '${cswalletznz}', pivx = '${cswalletpivx}', dogec='${cswalletdogec}', fls='${cswalletfls}'`,  err => {
                     if (err) throw err;

                     console.log("[AUTOMOD] ColdStaking Address been Addded to Database");
                  });

                  connection.query(`
                     INSERT INTO profile_wallet SET userid = '${interaction.user.id}', znz = '${walletznz}', pivx = '${walletpivx}', dogec='${walletdogec}', fls='${walletfls}'`, err => {
                     if (err) throw err;

                     console.log("[AUTOMOD] Wallet Addresse been Addded to Database");
                  })
               } else {
                  await interaction.reply({ ephemeral: true, content: 'You already have Wallet, Please do `/wallet` See your Address and Balance and Staking'})
               }
            });
         } else if (interaction.customId.includes('no')) {
            await interaction.reply({ ephemeral: true, content: 'I have canceled your Creating Wallet, if want do it again just send `/createwallet`'})
         }
      }
   }
   // ———————————————[Select Menu]———————————————
   if (interaction.isSelectMenu()) {
   }
   // ———————————————[Context Menu]———————————————
   if (interaction.isContextMenu()) {
      await interaction.deferReply({ ephemeral: false });
      const command = client.slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
   }
});