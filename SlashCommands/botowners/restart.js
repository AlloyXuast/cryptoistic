const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "restart",
    description: "RESTART BOT (ONLY DEVELOPERS HAS ACCESS)",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    options: [],
 
    run: async (client, interaction, args) => {
        let embed1 = new MessageEmbed()
      embed1.setAuthor("UPDATE")
                 
      embed1.addField("Output", `\`\`\`BOT HAS BEEN RESTARTED\`\`\``)
                 
      embed1.setColor("GREEN");

      interaction.followUp({ embeds: [embed1] }).then(() => {
         process.exit();
      })
    }
}