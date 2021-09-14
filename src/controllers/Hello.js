const telegramMessenger = require('../helpers/telegramMessenger')

const Hello  = (telegram,message)=>{
    const welcomeMessage = `you wonder how you can talk to me? just tell me the name and diminutive of a cryptocurrency and I'll give you its current dollar value. try to type btc and send`
    telegramMessenger(telegram,message.chat.id,welcomeMessage)
}

module.exports = Hello