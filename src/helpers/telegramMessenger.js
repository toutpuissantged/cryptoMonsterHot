
const telegramMessenger = (telegram,id,msg) =>{
    telegram.sendMessage(id, msg) 
}

module.exports = telegramMessenger