module.exports = {
    name: "invite",
    description: "Send bot invite link",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    cooldowns: 2000,
    options: [],
 
    run: async (client, interaction, args) => {

        interaction.member.send(
            `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=414568541511`
        ).catch(console.error);

        interaction.followUp("I send you BOT invite link in DM's")

            

   }
}