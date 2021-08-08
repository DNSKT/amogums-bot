"use strict";

const Discord = require('discord.js');
const fs = require('fs');
const sussyBaka = new Discord.Client({ intents: ['GUILD_MEMBERS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILDS'] });
const commands = fs.readdirSync('./commands').filter(commandFile => commandFile.endsWith('.js'));
sussyBaka.commands = new Discord.Collection();
const { token, prefix } = require('./config.json');
let currentGames = new Map();
let currentParties = new Map();  // me da pereza escribir buen codigo
let startImages = new Map();  // asi que spameo maps :thumbsup:
let playersAndTheirRoles = new Map();
let dmChannels = new Map();
let crewmatesAndTheirTasks = new Map();
let completedTasksMap = new Map();
let ignore = [];

startImages.set(4, 'https://cdn.discordapp.com/attachments/800438158705295380/868174971975897128/skeld4Players.png');
startImages.set(5, 'https://cdn.discordapp.com/attachments/800438158705295380/868174971975897128/skeld5Players.png');
startImages.set(6, 'https://cdn.discordapp.com/attachments/800438158705295380/868174971975897128/skeld6Players.png');
startImages.set(7, 'https://cdn.discordapp.com/attachments/800438158705295380/868174971975897128/skeld7Players.png');
startImages.set(8, 'https://cdn.discordapp.com/attachments/800438158705295380/868174971975897128/skeld8Players.png');

sussyBaka.once('ready', async () => {
    console.log('amogus sus 😂😂');
});

for(let command of commands){
    const cmd = require(`./commands/${command}`);
    sussyBaka.commands.set(cmd.name, cmd);
}

sussyBaka.on('messageCreate', async message => {
    let filter = m => m.author.id === message.author.id
    let count =  0;

    let collector = await message.channel.createMessageCollector({ filter, time: 3000, max: 3});

    collector.on('collect', () => {
        count++;
    });

    collector.on('end', async () => {
        if(count >= 3){
            let messages = await message.channel.messages.fetch({ limit: 15 });

            messages = messages.filter(m => m.author.id === message.author.id);

            await message.channel.bulkDelete(messages, true).catch(console.error());
        }
        else{
            return;
        }
    })
});

sussyBaka.on('interactionCreate', async interaction => {
    if(!interaction.isButton()) return;
    let dmChannel = dmChannels.get(`${interaction.user.id}`);

    if(interaction.customId === 'Admin: Swipe card'){
        let adminEmbed = new Discord.MessageEmbed()
        .setTitle('Admin: Swipe card')
        .setColor(0xff0000)
        .setDescription('To complete the task, type: "`up`", "`go right`" and "`slowly btw`" (Not on the same message). You have 15 seconds')
        .setImage(`${require('./commands/tasks/tasks').tasks.get('Admin: Swipe card')}`);

        let adminEmbed2 = new Discord.MessageEmbed()
        .setTitle('You\'re in admin, now you can do the `Swipe card` task')
        .setImage('https://media.discordapp.net/attachments/865444653478051851/872630917619933214/unknown.png')

        dmChannel.send({ embeds: [adminEmbed2, adminEmbed] });

        let collected = [];
        let filter = m => m.content;

        let collector = await dmChannel.createMessageCollector({ filter, time: 15 * 1000, max: 3 });

        collector.on('collect', message => {
            collected.push(message)
        });

        collector.on('end', a => {
            console.log(collected.length)

            if(collected.size < 1) return dmChannel.send('15 seconds have passed and you didnt send any messages, you failed');
            dmChannel.send('Time\'s out!');

            if(!'up' in collected || !'go right' in collected || !'slowly btw' in collected) return dmChannel.send('You failed, try again');
            else{
                if(completedTasksMap.get(interaction.user.id) === 'Admin: Swipe card'){
                    dmChannel.send('Well done! Since you\'ve already completed this task the number of completed tasks was not increased');
                }
                else{
                    if(collected.length === 3){
                        let sisas = currentParties.get('completedTasks');
                        sisas++;
    
                        completedTasksMap.set(interaction.user.id, 'Admin: Swipe card');
                        dmChannel.send('Well done! You have completed one task, you can click the button and do the task again, but it wont increase the number of completed tasks');
                    }
                    else{
                        dmChannel.send('You failed, try again');
                    }
                }
            }
        })
    }
    else if(interaction.customId === 'Shieds: Prime shields'){
        
    }
    else if(interaction.customId === 'O2: Clean O2 filter'){
        
    }
    else if(interaction.customId === 'Weapons: Clear asteroids'){
        
    }
    else if(interaction.customId === 'Reactor: Unlock manifolds'){
        
    }
    else if(interaction.customId === 'Upper engine: Align output'){
        
    }
    else if(interaction.customId === 'Lower engine: Align output'){
        
    }
    else if(interaction.customId === 'Navigation: Stabilize steering'){
        
    }
    else if(interaction.customId === 'Electrical: Fix wiring'){
        
    }
    else return;
});

sussyBaka.on('messageCreate', message => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let command = sussyBaka.commands.get(args.shift().toLowerCase());

    if(!command) return;

    try{
        command.execute(message, args, currentGames, currentParties, startImages, playersAndTheirRoles, dmChannels, crewmatesAndTheirTasks);
    }
    catch(e){
        message.channel.send(`
        \`\`\` ${e} \`\`\`
        `)
        console.error(e);
    }
});

sussyBaka.login(token);

exports.users = currentGames.get('players');
exports.client = sussyBaka;