
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const getCurrentPrice  = require('./src/controllers/GetCurrentPrice')
const telegram = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true }) 


telegram.on("text", ( message) => {
  getCurrentPrice(message,telegram)
})