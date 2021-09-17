import Telegram from 'node-telegram-bot-api/index'

const telegramMessenger = (telegram:Telegram,id:number,msg:string) =>{
    /**
     * charger d'envoyer les messages telegram au client 
     * @param telegram @type {Telegram} instance de l'objet telegram
     * @param id @type {number} identifient du message
     * @param msg @type {string} message a envoyer 
     */
    telegram.sendMessage(id, msg) 
}

export default telegramMessenger