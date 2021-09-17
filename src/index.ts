
import TelegramBot from 'node-telegram-bot-api';
require('dotenv').config()
import Router from './core/routerEngine';
import isProd from './config/isProd';

import getCurrentPrice from './controllers/GetCurrentPrice';
import WelcomeRoute from './controllers/welcome';
import HelpRoute from './controllers/Help';
import BigCacheSystemCmd from './admin/saveBigCache';

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../data/dev.sqlite', (err:any) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the in-memory SQlite database.')
})
const KEY:string = JSON.parse(JSON.stringify(isProd()?process.env.TELEGRAM_BOT_KEY:process.env.TELEGRAM_BOT_KEY_DEV))
const telegram = new TelegramBot(KEY, { polling: true }) 

telegram.on("text", (message:any) => {
  const TelegramRouter = new Router(telegram,message,db)
  TelegramRouter.Command('/start',WelcomeRoute)
  TelegramRouter.Command('/help',HelpRoute)
  TelegramRouter.Command('/bigcache',BigCacheSystemCmd)
  TelegramRouter.DefaultLink(getCurrentPrice)
})