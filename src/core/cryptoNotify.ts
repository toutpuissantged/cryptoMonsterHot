import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

interface CryptoNotify {
    telegram:Telegram,
    message:Message,
    state:any
}

class CryptoNotify {
    constructor(telegram:Telegram,message:Message){
        this.telegram = telegram
        this.message = message
        this.state = {}
    }
    Check(){
        const date = new Date().getTime()
        console.log(date)
    }

}
export default CryptoNotify