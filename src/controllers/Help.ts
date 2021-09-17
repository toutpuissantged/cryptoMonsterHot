import telegramMessenger from '../helpers/telegramMessenger'
import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

const Welcome  = (telegram:Telegram,message:Message,db:Database)=>{
    /**
     * message de d'aide
     */
    const welcomeMessage = `you wonder how you can talk to me? just tell me the name and diminutive of a cryptocurrency and I'll give you its current dollar value. try to type btc and send`
    telegramMessenger(telegram,message.chat.id,welcomeMessage)
}

export default Welcome