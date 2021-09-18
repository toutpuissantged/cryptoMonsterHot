import TelegramBot from "node-telegram-bot-api";
require("dotenv").config();
import isProd from "./config/isProd";
import Routes from "./routes/index";
import Telegram, { Message } from "node-telegram-bot-api/index";
import { Database } from "sqlite3/index";

const sqlite3 = require("sqlite3").verbose();
const db: Database = new sqlite3.Database("./data/dev.sqlite", (err: any) =>
  err
    ? console.error(err.message)
    : console.log("Connected to the in-memory SQlite database.")
);
const KEY: string = JSON.parse(
  JSON.stringify(
    isProd() ? process.env.TELEGRAM_BOT_KEY : process.env.TELEGRAM_BOT_KEY_DEV
  )
);
const telegram: Telegram = new TelegramBot(KEY, { polling: true });

telegram.on("text", (message: Message) => {
  Routes(telegram, message, db);
});
