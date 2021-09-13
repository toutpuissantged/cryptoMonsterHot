const telegramMessenger = require('../helpers/telegramMessenger')
const gekoFetch = require('../helpers/coinGekoFech')

const GetCurrentPrice  = (message,telegram) =>{

    const chatId = message.chat.id
    let isFound = false
    telegramMessenger(telegram,chatId,'loading ...')
    gekoFetch(message).then((res)=>{
      res.data.map((data,index)=>{
        if (data.id === message.text || data.symbol === message.text) {
          const usd_price  = data.market_data.current_price.usd
          const msg = `${message.text} current value is ${usd_price} $`
          telegramMessenger(telegram,chatId,msg)
          isFound = true
        }
      })
      if(!isFound){
        telegramMessenger(telegram,chatId,'this crypto is not found !!!')
      }
    }) 
    .catch((err)=>{

    })
    .finally(()=>{

    })
}

module.exports =  GetCurrentPrice