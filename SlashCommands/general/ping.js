module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    cooldowns: 2000,
    run: async (client, interaction, args) => {
       interaction.followUp(`Pinging...`).then((m4) => {
         setTimeout(() => {
             m4.edit({ content: `${client.ws.ping}ms!` });
         }, 2000);
      });
    },
 };