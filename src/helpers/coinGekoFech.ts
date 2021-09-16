const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
import {Message} from 'node-telegram-bot-api/index'
import {fetchData} from '../types/index'

const gekoFetch = async(message:Message) => {
    let data:any = await CoinGeckoClient.coins.all();
    return data
}

export default gekoFetch