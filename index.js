
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const Router  = require('./src/core/router')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./data/dev.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

const getCurrentPrice  = require('./src/controllers/GetCurrentPrice')
const WelcomeRoute = require('./src/controllers/welcome')
const HelpRoute = require('./src/controllers/Help')

const telegram = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true }) 

telegram.on("text", (message) => {
  const TelegramRouter = new Router(telegram,message,db)
  // console.log(message)
  TelegramRouter.Command('/start',WelcomeRoute)
  TelegramRouter.Command('/help',HelpRoute)
  TelegramRouter.DefaultLink(getCurrentPrice)
  
})

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});