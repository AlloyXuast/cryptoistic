const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "createwallet",
    description: "Creating your Crypto Wallet Here",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    cooldowns: 2000,
    run: async (client, interaction, args) => {
        const buttonVerify = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('yes-walletcreate')
            .setLabel('YES')
            .setStyle('SUCCESS')
          	.setDisabled(false), // Set it to "true" if you don't want people to be able to use the button at all
          new MessageButton()
            .setCustomId('no-walletcreate')
            .setLabel('NO')
            .setStyle('DANGER')
          	.setDisabled(false),
        );
        
        interaction.followUp({ ephemeral: true, content: 'Please Confirm that you Wanted Create a Wallets', components: [buttonVerify] })
    },
 };