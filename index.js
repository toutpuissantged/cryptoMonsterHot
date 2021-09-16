
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const Router  = require('./src/core/router')
const sqlite3 = require('sqlite3').verbose();
const isProd = require('./src/config/isProd')

let db = new sqlite3.Database('./data/dev.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

const getCurrentPrice  = require('./src/controllers/GetCurrentPrice')
const WelcomeRoute = require('./src/controllers/welcome')
const HelpRoute = require('./src/controllers/Help')
const BigCacheSystemCmd = require('./src/admin/saveBigCache')

const KeyValidation = () =>{
  if(isProd()){
    return process.env.TELEGRAM_BOT_KEY
  }
  else{
    return process.env.TELEGRAM_BOT_KEY_DEV
  }
}

const KEY = KeyValidation()
const telegram = new TelegramBot(KEY, { polling: true }) 

telegram.on("text", (message) => {
  const TelegramRouter = new Router(telegram,message,db)
  // console.log(message)
  TelegramRouter.Command('/start',WelcomeRoute)
  TelegramRouter.Command('/help',HelpRoute)
  TelegramRouter.Command('/bigcache',BigCacheSystemCmd)
  TelegramRouter.DefaultLink(getCurrentPrice)
  
})