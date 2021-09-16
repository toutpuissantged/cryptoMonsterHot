import Telegram from 'node-telegram-bot-api/index'

const telegramMessenger = (telegram:Telegram,id:number,msg:string) =>{
    telegram.sendMessage(id, msg)
}

export default telegramMessenger