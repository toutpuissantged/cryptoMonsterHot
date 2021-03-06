import telegramMessenger from "../helpers/telegramMessenger";
import gekoFetch from "../helpers/coinGekoFech";
import SaveCache from "../core/saveCache";
import isProd from "../config/isProd";
import Telegram, { Message } from "node-telegram-bot-api/index";
import { Database } from "sqlite3/index";
import { fetchData, res } from "../types/index";
import { CONSTANT } from "../data/constant";

const GetCurrentPrice = (
  telegram: Telegram,
  message: Message,
  db: Database
) => {
  /**
   * traite les donnees du cryptomonaie
   * @param telegram @type {Telegram} instance de telegram-bot initialisee
   * @param message @type {Message} objet message renvoyee par l'api telegram
   * @param db @type {Database} instance de la base de donnee creer
   */
  const chatId: number = message.chat.id;
  let isFound: boolean = false;
  const txt: string = JSON.parse(JSON.stringify(message.text));
  const text: string = txt.toLowerCase();

  gekoFetch(message)
    .then((res: res) => {
      //console.log(res.data)
      res.data.map((data: fetchData, index: number) => {
        if (data.id === text || data.symbol === text) {
          InfoSend(telegram, message, data);
          isFound = true;
          SaveCache(data, message, db);
        }
      });
      if (!isFound) {
        telegramMessenger(
          telegram,
          chatId,
          CONSTANT.Telegram.DefaultMessage.cryptoNotFound
        );
      }
    })
    .catch((err: any) => {})
    .finally(() => {});
};

const InfoSend = (telegram: Telegram, message: Message, data: fetchData) => {
  /**
   * envoye le prix de la cryptomonaie comme message telegram
   * @param telegram @type {Telegram} instance de telegram-bot initialisee
   * @param message @type {Message} objet message renvoyee par l'api telegram
   * @param data @type {fetchData} information relative au cryptomonaie
   */
  const usd_price: number = data.market_data.current_price.usd;
  const chatId: number = message.chat.id;
  const txt: string = JSON.parse(JSON.stringify(message.text));
  const text: string = txt.toLowerCase();
  const msg = `${text} current value is ${usd_price} $`;
  const image = data.image.large;
  telegramMessenger(telegram, chatId, msg);
  telegram.sendPhoto(chatId, image);
};

const LoadCache = (telegram: Telegram, message: Message, db: Database) => {
  /**
   * charge le cache depuis la base de donnee
   * @param telegram @type {Telegram} instance de telegram-bot initialisee
   * @param message @type {Message} objet message renvoyee par l'api telegram
   * @param db @type {Database} instance de la base de donnee creer
   */
  const txt: string = JSON.parse(JSON.stringify(message.text));
  const text: string = txt.toLowerCase();

  db.all(`SELECT data FROM cache WHERE name ='${text}'`, (err, row) => {
    console.log(row);
    if (err) {
      return console.log(err.message);
    } else if (row.length === 0) {
      console.log("row length  = 0");
    } else {
      const data = JSON.parse(row[0].data);
      InfoSend(telegram, message, data);
      //console.log('name is found in db',row[0])
    }
  });
};

const Main = (telegram: Telegram, message: Message, db: Database) => {
  /**
   * fonction d'entrer qui decide depuis ou charger les donnes
   * @param telegram @type {Telegram} instance de telegram-bot initialisee
   * @param message @type {Message} objet message renvoyee par l'api telegram
   * @param db @type {Database} instance de la base de donnee creer
   */

  telegramMessenger(
    telegram,
    message.chat.id,
    CONSTANT.Telegram.DefaultMessage.loading
  );
  if (!isProd()) {
    GetCurrentPrice(telegram, message, db);
  } else {
    LoadCache(telegram, message, db);
  }
};

export default Main;
