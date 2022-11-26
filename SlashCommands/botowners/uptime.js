const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "uptime",
    description: "Returns BOT Uptime",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    options: [],
 
    run: async (client, interaction, args) => {
      let seconds = Math.floor(message.client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
      return interaction.followUp(`Uptime: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
            .catch(console.error);
    }
}