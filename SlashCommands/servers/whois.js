const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../utils/funt-slash.js");

module.exports = {
    name: "whois",
    description: "Returns user information",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["ADMINISTRATOR"],
    botpermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    cooldowns: 2000,
    options: [{
        name: 'user',
        description: 'Select User',
        type: 'STRING',
        required: true
    }],
 
    run: async (client, interaction, args) => {

        const member = getMember(interaction, interaction.options.getString('user'));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== interaction.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

        .addField('Member information:', stripIndents `**- Display name:** ${member.displayName}
            **- Joined at:** ${joined}
            **- Roles:** ${roles}`, true)

        .addField('User information:', stripIndents `**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Created at**: ${created}`, true)

        .setTimestamp()
  
        interaction.followUp({
            embeds: [embed]
        });

    }
}