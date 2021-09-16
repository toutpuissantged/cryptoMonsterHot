const telegramMessenger = require('../helpers/telegramMessenger')
const gekoFetch = require('../helpers/coinGekoFech')
const os  = require('os')
const SaveCache = require('../core/saveCache')

const GetCurrentPrice  = (telegram,message,db) =>{
    const chatId = message.chat.id
    let isFound = false
    const text = message.text.toLowerCase()
    
    gekoFetch(message).then((res)=>{
      //console.log(res.data)
      res.data.map((data,index)=>{
        if (data.id === text || data.symbol === text) {
          InfoSend(telegram,message,data)
          isFound = true
          SaveCache(data,message,db)
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

const InfoSend = (telegram,message,data) =>{
  const usd_price  = data.market_data.current_price.usd
  const chatId = message.chat.id
  const text = message.text.toLowerCase()
  const msg = `${text} current value is ${usd_price} $`
  const image = data.image.large
  telegramMessenger(telegram,chatId,msg)
  telegram.sendPhoto(chatId, image)
}

const Main = (telegram,message,db) =>{
    const my_os = os.type()
    const DEV_OS = 'Windows_NT'
    console.log(my_os)
    const Loading = 'loading ...  please wait !!!'
    telegramMessenger(telegram,message.chat.id,Loading)
    if(my_os===DEV_OS){
      GetCurrentPrice(telegram,message,db)
    }
    else {
      LoadCache(telegram,message,db)
    }
}

const LoadCache = (telegram,message,db) =>{
  const text = message.text.toLowerCase()
  db.all(`SELECT data FROM cache WHERE name ='${text}'`, (err,row) => {
    console.log(row)
    if(err){
      return console.log(err.message)
    }
    else if (row.length===0) {
      
      console.log('row length  = 0');
    }
    // get the last insert id
    else{
      const data = JSON.parse(row[0].data)
      InfoSend(telegram,message,data)
      console.log('name is found in db',row[0])
    }
  })
}

module.exports =  Main