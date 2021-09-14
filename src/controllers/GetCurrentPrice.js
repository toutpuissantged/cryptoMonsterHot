const telegramMessenger = require('../helpers/telegramMessenger')
const axios = require('axios')

const GetCurrentPrice  = (telegram,message,db) =>{

    const chatId = message.chat.id
    let isFound = false
    const text = message.text.toLowerCase()
    const url  = `https://api.coingecko.com/api/v3/coins/${text}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    telegramMessenger(telegram,chatId,'loading ... please wait !!!')
    
    axios.get(url).then((res)=>{
      const data = res.data
      if (data.id === text || data.symbol === text) {
        const usd_price  = data.market_data.current_price.usd
        const msg = `${message.text} current value is ${usd_price} $`
        const image = data.image.large
        telegram.sendPhoto(chatId, image);
        telegramMessenger(telegram,chatId,msg)
        isFound = true
      }
      else if(!isFound){
        telegramMessenger(telegram,chatId,'this crypto is not found !!!')
      }
    }) 
    .catch((err)=>{
      console.log(err)
      telegramMessenger(telegram,chatId,'this crypto is not found !!!')
    })
    .finally(()=>{

    })
}

module.exports =  GetCurrentPrice