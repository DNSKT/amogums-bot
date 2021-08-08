const { MessageEmbed } = require('discord.js');
const tasks = require('./tasks.js').tasks;
const tasks2 = require('./tasks.js').tasks2;
const tasks3 = require('./tasks.js').tasks3;
const tasks4 = require('./tasks.js').tasks4;
const tasks5 = require('./tasks.js').tasks5;

let tasksArray = [];
let tasksArray2 = [];
let tasksArray3 = [];
let tasksArray4 = [];
let tasksArray5 = [];

for(task of tasks){
    tasksArray.push(task);
}

for(task of tasks2){
    tasksArray2.push(task);
}

for(task of tasks3){
    tasksArray3.push(task);
}

for(task of tasks4){
    tasksArray4.push(task);
}

for(task of tasks5){
    tasksArray5.push(task);
}

let tasksEmbed = new MessageEmbed()
.setDescription(`${tasksArray.map(task => task[0]).join('\n')}`)
.setColor(0xff0000)
.setTitle('You\'re a crewmate. These are your tasks')

let tasksEmbed2 = new MessageEmbed()
.setDescription(`${tasksArray2.map(task => task[0]).join('\n')}`)
.setColor(0xff0000)
.setTitle('You\'re a crewmate. These are your tasks')

let tasksEmbed3 = new MessageEmbed()
.setDescription(`${tasksArray3.map(task => task[0] ).join('\n')}`)
.setColor(0xff0000)
.setTitle('You\'re a crewmate. These are your tasks')

let tasksEmbed4 = new MessageEmbed()
.setDescription(`${tasksArray4.map(task => task[0]).join('\n')}`)
.setColor(0xff0000)
.setTitle('You\'re a crewmate. These are your tasks')

let tasksEmbed5 = new MessageEmbed()
.setDescription(`${tasksArray5.map(task => task[0]).join('\n')}`)
.setColor(0xff0000)
.setTitle('You\'re a crewmate. These are your tasks')

exports.embeds = [tasksEmbed, tasksEmbed2, tasksEmbed3, tasksEmbed4, tasksEmbed5];