const Discord = require('discord.js');

module.exports = {
    name: "party",
    description: "Creates, deletes or shows info of a party, for the create part, there cant be two or more parties on the same server at the same time",
    execute(message, args, currentGames, currentParties){
        
        if(args[0].toLowerCase() === 'create'){
            let guildName = message.guild.name
            let partyOwner = message.author.id
            let players = [message.author.id];
    
            if(currentParties.get(message.guild.id) === guildName || currentParties.size > 0 || currentGames.size > 0) return message.channel.send('bro read the command description\n(sorry))))))');
    
            currentParties.set(message.guild.id, guildName);
            currentParties.set('party owner', partyOwner);
            currentParties.set('players', players)
            currentParties.set('isFull', false)
    
            message.channel.send('Succesfully created a party');
            console.log(currentParties);
        }
        else if(args[0].toLowerCase() === 'info'){
            let embed = new Discord.MessageEmbed()
            .setTitle('Party info: ')
            .setDescription(`Owner: <@${currentParties.get('party owner')}>\n\nParticipants (${currentParties.get('players').length}):\n${currentParties.get('players').map(player => `<@${player}>`).join("\n")}`)
            .setColor(0xdeadaf)

            message.channel.send({ embeds: [embed] })
        }
        else if(args[0].toLowerCase() === 'delete'){
            if(currentParties.get('party owner') !== message.author.id) return message.channel.send('You can\'t delete this party because you\'re not the owner');
            currentParties.clear()
        }
    }
}