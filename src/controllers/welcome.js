const telegramMessenger = require('../helpers/telegramMessenger')

const Welcome  = (telegram,message)=>{
    const welcomeMessage = `hi and welcome ${message.chat.username} , passionate about cryptomonics, so for me it is cryptomonster, in a world where information evolves at the speed of light i will help you to make as much gain as possible in time when money. so ready to get started? let's go`
    telegramMessenger(telegram,message.chat.id,welcomeMessage)
}

module.exports = Welcome