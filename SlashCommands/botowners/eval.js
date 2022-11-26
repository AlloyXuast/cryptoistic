const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    description: "Evaluate Code",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    options: [{
        name: 'evalcode',
        description: 'CODE HERE',
        type: 'STRING',
        required: true
    }],
 
    run: async (client, interaction, args) => {
 

        try {
            const code = interaction.options.getString('evalcode'); //args.join(" ");
            if (!code) {
               return interaction.followUp("Please Provide A code to eval!");
            }
            let evaled = eval(code);
   
            if (typeof evaled !== "string")
               evaled = require("util").inspect(evaled);
   
            let embed = new MessageEmbed()
               .setAuthor("Eval")
               .addField("Input", `\`\`\`${code}\`\`\``)
               .addField("Output", `\`\`\`${evaled}\`\`\``)
               .setColor("BLUE");
   
            interaction.followUp({ embeds: [embed] });
         } catch (err) {
            interaction.followUp(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
         }
    }
}