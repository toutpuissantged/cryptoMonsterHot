import Router from '../core/routerEngine';
import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

import getCurrentPrice from '../controllers/GetCurrentPrice';
import WelcomeRoute from '../controllers/welcome';
import HelpRoute from '../controllers/Help';
import BigCacheSystemCmd from '../admin/saveBigCache';

const Routes = (telegram:Telegram,message:Message,db:Database) =>{
    /**
  * enregistre tout les routes de l'application
  * @param telegram @type {Telegram} instance de telegram-bot initialisee
  * @param message @type {Message} objet message renvoyee par l'api telegram
  * @param db @type {Database} instance de la base de donnee creer
   */
    const TelegramRouter = new Router(telegram,message,db)
    TelegramRouter.Command('/start',WelcomeRoute)
    TelegramRouter.Command('/help',HelpRoute)
    TelegramRouter.Command('/bigcache',BigCacheSystemCmd)
    TelegramRouter.DefaultLink(getCurrentPrice)

    return TelegramRouter
}

export default Routes