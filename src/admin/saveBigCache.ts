import telegramMessenger from '../helpers/telegramMessenger'
import gekoFetch from '../helpers/coinGekoFech'
import SaveCache from '../core/saveCache'
import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'
import {fetchData} from '../types/index'

const SaveBigCache  = (telegram:Telegram,message:Message,db:Database) =>{
    const chatId = message.chat.id
    const txt:string = JSON.parse(JSON.stringify(message.text))
    const text:string = txt.toLowerCase()
    telegramMessenger(telegram,chatId,'the bigCache Systeme start ...')
    gekoFetch(message).then((res)=>{
      //console.log(res.data)
      res.data.map((data:fetchData,index:number)=>{
        if(text==='/bigcache'){
            [data.id,data.symbol].map((name,index)=>{
                message.text = name
                SaveCache(data,message,db)
            })
        }
        if((index+1)===res.data.length){
            telegramMessenger(telegram,chatId,'the bigCache Systeme is successfully update database')
        }
      })
    })
    .catch((err)=>{

    })
    .finally(()=>{

    })
}


export default SaveBigCache