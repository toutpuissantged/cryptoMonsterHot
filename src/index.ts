
import TelegramBot from 'node-telegram-bot-api';
require('dotenv').config()
import Router from './core/router';
const sqlite3 = require('sqlite3').verbose();
import isProd from './config/isProd';

let db = new sqlite3.Database('../data/dev.sqlite', (err:any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

import getCurrentPrice from './controllers/GetCurrentPrice';
import WelcomeRoute from './controllers/welcome';
import HelpRoute from './controllers/Help';
import BigCacheSystemCmd from './admin/saveBigCache';

const KeyValidation = () =>{
  let KEY:string|undefined
  if(isProd()){
    KEY = process.env.TELEGRAM_BOT_KEY
  }
  else{
    KEY = process.env.TELEGRAM_BOT_KEY_DEV
  }
  return KEY
}

const KEY:string|undefined = KeyValidation()
const KEY_str:string = JSON.parse(JSON.stringify(KEY))
const telegram = new TelegramBot(KEY_str, { polling: true })

telegram.on("text", (message:any) => {
  const TelegramRouter = new Router(telegram,message,db)
  // console.log(message)
  TelegramRouter.Command('/start',WelcomeRoute)
  TelegramRouter.Command('/help',HelpRoute)
  TelegramRouter.Command('/bigcache',BigCacheSystemCmd)
  TelegramRouter.DefaultLink(getCurrentPrice)
  
})