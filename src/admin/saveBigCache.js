const telegramMessenger = require('../helpers/telegramMessenger')
const gekoFetch = require('../helpers/coinGekoFech')
const SaveCache = require('../core/saveCache')

const SaveBigCache  = (telegram,message,db) =>{
    const chatId = message.chat.id
    const text = message.text.toLowerCase()
    telegramMessenger(telegram,chatId,'the bigCache Systeme start ...')
    gekoFetch(message).then((res)=>{
      //console.log(res.data)
      res.data.map((data,index)=>{
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


module.exports = SaveBigCache