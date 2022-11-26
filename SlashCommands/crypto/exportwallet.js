const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "exportwallet",
    description: "Creating your Crypto Wallet Here",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    cooldowns: 2000,
    run: async (client, interaction, args) => {
        const connection = client.sqlconn;
        connection.query(`SELECT * FROM profile_wallet WHERE userid='${interaction.user.id}'`, async function(err, results) {
            if (results.length === 0) {
                return interaction.followUp({ ephemeral: true, content: 'You dont have a Wallet, Please do `/createwallet` to Create Address and Balance and Staking'})
            } else {
                const buttonVerify = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('yes-walletexport')
                    .setLabel('YES')
                    .setStyle('SUCCESS')
          	        .setDisabled(false), // Set it to "true" if you don't want people to be able to use the button at all
                    new MessageButton()
                    .setCustomId('no-walletexport')
                    .setLabel('NO')
                    .setStyle('DANGER')
          	        .setDisabled(false),
                );
        
                interaction.followUp({ ephemeral: true, content: 'Do you Want Export Your Keys?', components: [buttonVerify] })
            }
        });
    },
 };