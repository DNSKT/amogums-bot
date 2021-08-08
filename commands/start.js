const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const embeds = require('./tasks/embeds.js').embeds;

module.exports = {
    name: "start",
    description: "Starts a new game (only if you're the owner of a party with 4-8 players)",
    async execute(message, args, currentGames, currentParties, startImages, playersAndTheirRoles, dmChannels, crewmatesAndTheirTasks){

        if(currentParties.size == 0) return message.channel.send('To start playing, first you need to join or create a party');
        if(currentParties.get('players').length < 4) return message.channel.send('There has to be at least 4 players in the party to start playing')

        let guildName = message.guild.name
        let partyOwner = message.author.id
        let players = [message.author.id];

        currentGames.set(message.guild.id, guildName);
        currentGames.set('party owner', partyOwner);
        currentGames.set('players', players);
        currentGames.set('completedTasks', 0);

        let gameChannel = await message.guild.channels.create('amogus-sus-😂😂-game', {
            type: 'text'
        });

        let randomTasksEmbed = [embeds[0], embeds[1], embeds[2], embeds[3], embeds[4]];
        let roles = [];

        if(currentParties.get('players').length == 4){
            roles.push('crewmate', 'sussy imposter', 'crewmate', 'crewmate')

        }
        else if(currentParties.get('players').length == 5){
            roles.push('crewmate', 'sussy imposter', 'crewmate', 'crewmate', 'crewmate')
        }
        else if(currentParties.get('players').length == 6){
            roles.push('crewmate', 'sussy imposter', 'crewmate', 'crewmate', 'crewmate', 'sussy imposter')
        }
        else if(currentParties.get('players').length == 7){
            roles.push('crewmate', 'sussy imposter', 'crewmate', 'crewmate', 'crewmate', 'sussy imposter', 'crewmate')
        }
        else if(currentParties.get('players').length == 8){
            roles.push('crewmate', 'sussy imposter', 'crewmate', 'crewmate', 'crewmate', 'sussy imposter', 'crewmate', 'sussy imposter')
        }

        gameChannel.permissionOverwrites.create(message.guild.roles.everyone.id, {
            VIEW_CHANNEL: false,
        });

        currentParties.get('players').forEach(async player => {
            gameChannel.permissionOverwrites.create(player, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
            });

            let role;
            role = roles[Math.floor(Math.random() * roles.length)];

            let crewmateTasks;
            crewmateTasks = randomTasksEmbed[Math.floor(Math.random() * randomTasksEmbed.length)];

            playersAndTheirRoles.set(player, role);

            randomTasksEmbed.splice(randomTasksEmbed.indexOf(crewmateTasks), 1);
            console.log(randomTasksEmbed);

            roles.splice(roles.indexOf(role), 1);
            console.log(roles);
            console.log(playersAndTheirRoles);

            let user = await message.client.users.fetch(player);
            let dmChannel = await user.createDM();
    
            dmChannels.set(player, dmChannel);

            if(role === 'crewmate'){
                let user = await message.client.users.fetch(player);
                user.send({embeds: [crewmateTasks] });
                crewmatesAndTheirTasks.set(player, crewmateTasks.description.split('\n'));

                let embed = new MessageEmbed()
                .setTitle('What task do you want to do?')
                .setColor(0xff0000)
                
                let buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`${crewmatesAndTheirTasks.get(player)[0]}`)
                    .setLabel(`${crewmatesAndTheirTasks.get(player)[0]}`)
                    .setStyle('PRIMARY'),
    
                    new MessageButton()
                    .setCustomId(`${crewmatesAndTheirTasks.get(player)[1]}`)
                    .setLabel(`${crewmatesAndTheirTasks.get(player)[1]}`)
                    .setStyle('PRIMARY'),
                
                    new MessageButton()
                    .setCustomId(`${crewmatesAndTheirTasks.get(player)[2]}`)
                    .setLabel(`${crewmatesAndTheirTasks.get(player)[2]}`)
                    .setStyle('PRIMARY'),
                )
                
                user.send({ embeds: [embed], components: [buttons] });
            }
            else{
                let user = await message.client.users.fetch(player);
                user.send(`You're a ${role}`);
            }

        });
        
        let gameStartedEmbed = new MessageEmbed()
        .setTitle('The amogus sus game has started')
        .setImage(startImages.get(currentParties.get('players').length))
        .setColor(0xff0000)

        await gameChannel.send({ embeds: [gameStartedEmbed]});
        currentParties.clear();
        console.log(dmChannels);
    }
}