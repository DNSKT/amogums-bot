const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Shows this message",
    execute(message){
        let helpEmbed = new MessageEmbed()
        .setTitle('Available commands')
        .setColor(0x36393F)

        message.client.commands.forEach(cmd => {
            helpEmbed.addField(cmd.name, cmd.description);
        });

        message.channel.send({ embeds: [helpEmbed] });
    }
}