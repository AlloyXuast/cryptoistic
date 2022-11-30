const { MessageEmbed } = require('discord.js');
const RPCClient = require('@jskitty/bitcoin-rpc');
const fetch = require('node-fetch');

module.exports = {
    name: "withdraw",
    description: "Withdraw your Crypto Balance",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    cooldowns: 2000,
    options: [{
        name: 'address',
        description: 'put Crypto Wallet Address',
        type: 'STRING',
        required: true
    },{
        name: 'amount',
        description: 'put Crypto Amount to Send',
        type: 'STRING',
        required: true
    },{
        name: 'type',
        description: 'put Witch Crypto want Withdraw',
        type: 'STRING',
        required: true
    }],

    run: async (client, interaction, args) => {
        let pivx = new RPCClient(client.config.walletnodes.pivx.user, client.config.walletnodes.pivx.pass, client.config.walletnodes.pivx.ip, client.config.walletnodes.pivx.port);
        let znz = new RPCClient(client.config.walletnodes.znz.user, client.config.walletnodes.znz.pass, client.config.walletnodes.znz.ip, client.config.walletnodes.znz.port);
        let dogec = new RPCClient(client.config.walletnodes.dogec.user, client.config.walletnodes.dogec.pass, client.config.walletnodes.dogec.ip, client.config.walletnodes.dogec.port);
        let fls = new RPCClient(client.config.walletnodes.fls.user, client.config.walletnodes.fls.pass, client.config.walletnodes.fls.ip, client.config.walletnodes.fls.port);
        let monk = new RPCClient(client.config.walletnodes.monk.user, client.config.walletnodes.monk.pass, client.config.walletnodes.monk.ip, client.config.walletnodes.monk.port);
	let owo = new RPCClient(client.config.walletnodes.owo.user, client.config.walletnodes.owo.pass, client.config.walletnodes.owo.ip, client.config.walletnodes.owo.port);
        const connection = client.sqlconn;

        const txfeespivx = 0.04114;
        const txfeesdogec = 0.00904;
        const txfeesznz = 0.04;
        const txfeesfls = 0.04;
        
        const address = interaction.options.getString('address');
        const amount = parseInt(interaction.options.getString('amount'));
        const type = interaction.options.getString('type');

        let embed = new MessageEmbed();

        connection.query(`SELECT * FROM profile_walletbal WHERE userid='${interaction.user.id}'`, async function(err, results) {
            if (results.length === 0) {
                interaction.followUp({ ephemeral: true, content: 'You dont have a Wallet, Please do `/createwallet` to Create Address and Balance and Staking'})
            } else {

                var nodestatus = await fetch('http://localhost:3310/health').then(res => res.json())

                if (type == "pivx") {

                    if (amount < 0.1) return interaction.followUp({ ephemeral: true, content: 'Thats a Invalid Amount, Please Enter from 1 to 100000'})

                    var totalpivx = amount + txfeespivx;

                    if (totalpivx == results[0].pivx) {
                        if (nodestatus.pivx.status == "online") {
                            var walletpivxwithdraw = await pivx.call('sendtoaddress', address, amount);

                            console.log(walletpivxwithdraw)

                            var totalwithdrawpivx = amount - txfeespivx;
                        
                            embed.setColor(0x9900FF)
                            embed.setTitle("Withdrawal sent!")
                            embed.setDescription(
                                `A Blockchain + Treasury fee of **~${txfeespivx}** PIVX was charged.\n\n**Wthdraw:** ${totalwithdrawpivx} PIVX\n\n**Transaction ID:** ${walletpivxwithdraw}`
                            )
                            embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                            embed.setTimestamp()

                            interaction.followUp({ ephemeral: true,
                                embeds: [embed]
                            })

                            var removedpivx = totalpivx - results[0].pivx;

                            await connection.query(`UPDATE profile_walletbal SET pivx='${removedpivx}' WHERE userid='${interaction.user.id}'`)
                        }
                    } else {
                        interaction.followUp({ ephemeral: true, content: `You Do not have Enough PIVX, You need ${totalpivx} PIVX to do this Transactions!`})
                    }
                } else if (type == "dogec") {

                    if (amount < 0.1) return interaction.followUp({ ephemeral: true, content: 'Thats a Invalid Amount, Please Enter from 1 to 100000'})

                    var totaldogec = amount + txfeesdogec;

                    if (totaldogec == results[0].dogec) {
                        if (nodestatus.dogec.status == "online") {
                            var walletdogecwithdraw = await dogec.call('sendtoaddress', address, amount)

                            var totalwithdrawdogec = amount - txfeesdogec;

                            console.log(walletdogecwithdraw)

                            embed.setColor(0x9900FF)
                            embed.setTitle("Withdrawal sent!")
                            embed.setDescription(
                                `A Blockchain + Treasury fee of **~${txfeesdogec}** DOGEC was charged.\n\n**Wthdraw:** ${totalwithdrawdogec} DOGEC\n\n**Transaction ID:** ${walletdogecwithdraw}`
                            )
                            embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                            embed.setTimestamp()

                            interaction.followUp({ ephemeral: true,
                                embeds: [embed]
                            })

                            var removeddogec = total - results[0].dogec;

                            await connection.query(`UPDATE profile_walletbal SET dogec='${removeddogec}' WHERE userid='${interaction.user.id}'`)
                        } else {
                            interaction.followUp({ ephemeral: true, content: 'DOGEC NODE IS DOWN, WE BRING IT BACKUP. WE AWARE OF ISSUE!'})
                        }
                    } else {
                        interaction.followUp({ ephemeral: true, content: `You Do not have Enough DOGEC, You need ${totaldogec} DOGEC to do this Transactions!`})
                    }
                } else if (type == "znz") {

                    if (amount < 0.1) return interaction.followUp({ ephemeral: true, content: 'Thats a Invalid Amount, Please Enter from 1 to 100000'})

                    var totalznz = amount + txfeesznz;

                    if (totalznz == results[0].znz) {
                        if (nodestatus.znz.status == "online") {
                            var walletznzwithdraw = await znz.call('sendtoaddress', address, amount)

                            var totalwithdrawznz = amount - txfeesznz;

                            console.log(walletznzwithdraw)

                            embed.setColor(0x9900FF)
                            embed.setTitle("Withdrawal sent!")
                            embed.setDescription(
                                `A Blockchain + Treasury fee of **~${txfeesznz}** ZNZ was charged.\n\n**Wthdraw:** ${totalwithdrawznz} ZNZ\n\n**Transaction ID:** ${walletznzwithdraw}`
                            )
                            embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                            embed.setTimestamp()

                            interaction.followUp({ ephemeral: true,
                                embeds: [embed]
                            })

                            var removedznz = totalznz - results[0].znz;

                            await connection.query(`UPDATE profile_walletbal SET znz='${removedznz}' WHERE userid='${interaction.user.id}'`)
                        } else {
                            interaction.followUp({ ephemeral: true, content: 'ZNZ NODE IS DOWN, WE BRING IT BACKUP. WE AWARE OF ISSUE!'})
                        }
                    } else {
                        interaction.followUp({ ephemeral: true, content: `You Do not have Enough ZNZ, You need ${totalznz} ZNZ to do this Transactions!`})
                    }
                } else if (type == "fls") {

                    if (amount < 0.1) return interaction.followUp({ ephemeral: true, content: 'Thats a Invalid Amount, Please Enter from 1 to 100000'})

                    var totalfls = amount + txfeesfls;

                    if (totalfls == results[0].fls) {
                        if (nodestatus.fls.status == "online") {
                            var walletflswithdraw = await fls.call('sendtoaddress', address, amount)

                            var totalwithdrawfls = amount - txfeesfls;

                            console.log(walletflswithdraw)

                            embed.setColor(0x9900FF)
                            embed.setTitle("Withdrawal sent!")
                            embed.setDescription(
                                `A Blockchain + Treasury fee of **~${txfeesfls}** FLS was charged.\n\n**Wthdraw:** ${totalwithdrawfls} FLS\n\n**Transaction ID:** ${walletflswithdraw}`
                            )
                            embed.setFooter("Requested by " + interaction.user.username, client.user.avatarURL)
                            embed.setTimestamp()

                            interaction.followUp({ ephemeral: true,
                                embeds: [embed]
                            })

                            var removedfls = totalfls - results[0].fls;

                            await connection.query(`UPDATE profile_walletbal SET fls='${removedfls}' WHERE userid='${interaction.user.id}'`)
                        } else {
                            interaction.followUp({ ephemeral: true, content: 'FLS NODE IS DOWN, WE BRING IT BACKUP. WE AWARE OF ISSUE!'})
                        }
                    } else {
                        interaction.followUp({ ephemeral: true, content: `You Do not have Enough FLS, You need ${totalfls} DOGEC to do this Transactions!`})
                    }
                }
            }
        });
    },
 };
