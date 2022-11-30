const { MessageEmbed } = require('discord.js');
const RPCClient = require('@jskitty/bitcoin-rpc');

module.exports = {
    name: "wallet",
    description: "Creating your Crypto Wallet Here",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    cooldowns: 2000,
    run: async (client, interaction, args) => {
        let pivx = new RPCClient(client.config.walletnodes.pivx.user, client.config.walletnodes.pivx.pass, client.config.walletnodes.pivx.ip, client.config.walletnodes.pivx.port);
        let znz = new RPCClient(client.config.walletnodes.znz.user, client.config.walletnodes.znz.pass, client.config.walletnodes.znz.ip, client.config.walletnodes.znz.port);
        let dogec = new RPCClient(client.config.walletnodes.dogec.user, client.config.walletnodes.dogec.pass, client.config.walletnodes.dogec.ip, client.config.walletnodes.dogec.port);
        let fls = new RPCClient(client.config.walletnodes.fls.user, client.config.walletnodes.fls.pass, client.config.walletnodes.fls.ip, client.config.walletnodes.fls.port);
        let monk = new RPCClient(client.config.walletnodes.monk.user, client.config.walletnodes.monk.pass, client.config.walletnodes.monk.ip, client.config.walletnodes.monk.port);
	    let owo = new RPCClient(client.config.walletnodes.owo.user, client.config.walletnodes.owo.pass, client.config.walletnodes.owo.ip, client.config.walletnodes.owo.port);
        const connection = client.sqlconn;
        
        connection.query(`SELECT * FROM profile_wallet WHERE userid='${interaction.user.id}'`, async function(err, results) {
            if (results.length === 0) {
                return interaction.followUp({ ephemeral: true, content: 'You dont have a Wallet, Please do `/createwallet` to Create Address and Balance and Staking'})
            } else {
                var walletpivxamount = await pivx.call('getreceivedbylabel', interaction.user.id);
                var walletpivxaddress = await pivx.call('getaddressesbylabel', interaction.user.id);
                var walletpivxcoldstakingamount = "NOT SETUP YET";
                //var walletpivxcoldstakingamount = await pivx.getcoldstakingbalance(interaction.user.id);

                var walletznzaddress = await znz.call('getaddressesbyaccount', interaction.user.id);
                var walletznzamount = await znz.call('getbalance', interaction.user.id);
                var walletznzcoldstakingamount = await znz.call('getcoldstakingbalance', interaction.user.id);

                var walletdogecaddress = await dogec.call('getaddressesbylabel', interaction.user.id);
                var walletdogecamount = await dogec.call('getreceivedbylabel', interaction.user.id);
                var walletdogeccoldstakingamount = "NOT SETUP YET";
                //var walletdogeccoldstakingamount = await dogec.call('getreceivedbylabel', interaction.user.id);

                var walletflsaddress = await fls.call('getaddressesbyaccount', interaction.user.id);
                var walletflsamount = await fls.call('getbalance', interaction.user.id);
                var walletflscoldstakingamount = await fls.call('getcoldstakingbalance', interaction.user.id);
                
                var walletmonkaddress = await monk.call('getaddressesbyaccount', interaction.user.id);
                var walletmonkamount = await monk.call('getbalance', interaction.user.id);
                
                var walletowoaddress = await owo.call('getaddressesbyaccount', interaction.user.id);
                var walletowoamount = await owo.call('getbalance', interaction.user.id);

                let embed = new MessageEmbed();
                embed.setColor(0x9900FF)
                embed.setTitle("Crypto Wallets")
                embed.setDescription(
                    `PIVX WALLET:\nADDRESS: **${results[0].pivx}**\nBALANCE: **${walletpivxamount}**\nCOLDSTAKING BALANCE: **${walletpivxcoldstakingamount}**\n\n` +
                    `ZENZO WALLET:\nADDRESS: **${results[0].znz}**\nBALANCE: **${walletznzamount}**\nCOLDSTAKING BALANCE: **${walletznzcoldstakingamount}**\n\n` +
                    `DOGECASH WALLET:\nADDRESS: **${results[0].dogec}**\nBALANCE: **${walletdogecamount}**\nCOLDSTAKING BALANCE: **${walletdogeccoldstakingamount}**\n\n` +
                    `FLITS WALLET:\nADDRESS: **${results[0].fls}**\nBALANCE: **${walletflsamount}**\nCOLDSTAKING BALANCE: **${walletflscoldstakingamount}**\n\n` +
                    `MONK WALLET:\nADDRESS: **${results[0].monk}**\nBALANCE: **${walletmonkamount}**\n\n` +
                    `OWO WALLET:\nADDRESS: **${results[0].owo}**\nBALANCE: **${walletowoamount}**\n\n`
                )
                embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                embed.setTimestamp()

                interaction.followUp({ ephemeral: true,
                    embeds: [embed]
                })
            }
        });
    },
 };
