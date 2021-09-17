import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
import {Message} from 'node-telegram-bot-api/index'

const gekoFetch = async(message:Message) => {
    /**
     * il s'ocupe de recuperer les donnees des cryptomonaie
     * @param message @type {Message} objet de message renvoyer par l'api telegram
     */
    let data:any = await CoinGeckoClient.coins.all();
    return data
}

export default gekoFetch