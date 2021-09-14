
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const Router  = require('./src/core/router')

const getCurrentPrice  = require('./src/controllers/GetCurrentPrice')
const WelcomeRoute = require('./src/controllers/welcome')
const HelpRoute = require('./src/controllers/Help')

const telegram = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true }) 

telegram.on("text", (message) => {
  const TelegramRouter = new Router(telegram,message)
  // console.log(message)
  TelegramRouter.Command('/start',WelcomeRoute)
  TelegramRouter.Command('/help',HelpRoute)
  TelegramRouter.DefaultLink((telegram,message)=>{getCurrentPrice(message,telegram)})
  
})