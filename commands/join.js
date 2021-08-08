const Discord = require('discord.js');
 
module.exports = {
    name: "join",
    description: "Joins a party if theres one",
    execute(message, args, currentGames, currentParties){
        if(currentParties.size <= 0 || currentParties.get('isFull') === true || currentParties.get('players').includes(message.author.id) || currentGames.size > 0) return message.channel.send('There\'s no parties, there\'s one but it\'s full/in game or you already joined one');
        if(currentParties.get('players').length == 8) currentParties.get('isFull') = true;

        console.log(currentParties.get('players').push(message.author.id));
        
        let embed = new Discord.MessageEmbed()
        .setTitle('ee')
        .setDescription('You joined ' + `<@${currentParties.get('party owner')}>'s party`)
        .setColor(0xdeadaf)

        message.channel.send({ embeds: [embed] });

        console.log(currentParties);
    }
}