module.exports = {
    name: "entren",
    description: "solo shark",
    execute(message){
        if(message.author.id !== '784603219510427669') return;

        for(let i = 0; i < 10; i++){
            message.channel.send('@everyone hagan sus~join')
        }
    }
}