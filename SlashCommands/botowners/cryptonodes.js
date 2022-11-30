const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const RPCClient = require('@jskitty/bitcoin-rpc');

module.exports = {
    name: "cryptonodes",
    description: "Gets Realtime Updates by Owner Wallet / IPFS NODES",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    options: [{
        name: 'type',
        description: 'What Kind Data Type want me Pull blockcheck',
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
            if (interaction.options.getString('type') == "znz") {

                const globalres = await fetch('https://chainz.cryptoid.info/znz/api.dws?q=getblockcount');
                const globaldata = await globalres.text();
    
                const ourdata = await znz.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("ZENZO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("ZENZO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("ZENZO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else if (interaction.options.getString('type') == "dogec") {

                const globalres = await fetch('https://dogec.flitswallet.app/api/v1/');
                const globaldata = await globalres.json();
    
                const ourdata = await dogec.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata.backend.blocks) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("DOGEC WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata.backend.blocks - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("DOGEC WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("DOGEC WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata.backend.blocks - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata.backend.blocks).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else if (interaction.options.getString('type') == "fls") {

                const globalres = await fetch('https://fls.flitswallet.app/api/v1/');
                const globaldata = await globalres.json();
    
                const ourdata = await fls.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata.backend.blocks) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("FLS WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata.backend.blocks - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("FLS WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("FLS WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata.backend.blocks - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata.backend.blocks).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else if (interaction.options.getString('type') == "pivx") {

                const globalres = await fetch('https://pivx.flitswallet.app/api/v1/');
                const globaldata = await globalres.json();
    
                const ourdata = await pivx.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata.backend.blocks) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("PIVX WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata.backend.blocks - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("PIVX WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("PIVX WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.backend.blocks}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata.backend.blocks - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata.backend.blocks).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else if (interaction.options.getString('type') == "monk") {

                const globalres = await fetch('https://explorer.decenomy.net/coreapi/v1/coins/MONK/blocks?perPage=1&page=1');
                const globaldata = await globalres.json();
    
                const ourdata = await monk.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata.response[0].height) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("MONK WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata.response[0].height - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("MONK WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("MONK WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata.response[0].height - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata.response[0].height).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else if (interaction.options.getString('type') == "owo") {

                const globalres = await fetch('https://explorer.decenomy.net/coreapi/v1/coins/OWO/blocks?perPage=1&page=1');
                const globaldata = await globalres.json();
    
                const ourdata = await owo.call('getblockchaininfo');
    
                if (ourdata.blocks == globaldata.response[0].height) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("OWO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else if (globaldata.response[0].height - ourdata.blocks < -1) {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("OWO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `TRUE`)
                    embed1.setColor("GREEN");
                    interaction.followUp({ embeds: [embed1] });
                } else {
                    let embed1 = new MessageEmbed()
                    embed1.setAuthor("OWO WALLET NODE", `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
                    embed1.addField("Global NODE BLOCK", `${globaldata.response[0].height}`)
                    embed1.addField("OUR NODE BLOCK", `${ourdata.blocks}`) 
                    embed1.addField("MATCH", `FALSE`)
                    embed1.addField("BLOCKS BEHIND", `${globaldata.response[0].height - ourdata.blocks}`)
                    embed1.addField("PROGRESS", `${(100.0 * ourdata.blocks / globaldata.response[0].height).toFixed(2)}%`)
                    embed1.setColor("RED");
                    interaction.followUp({ embeds: [embed1] });
                    
                }
            } else {
                interaction.followUp({ content: "WRONG COMMAND, List: `znz|dogec|fls|pivx|monk|owo`"});
            }
    },
 };
