const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const gekoFetch = async(message) => {
    let data = await CoinGeckoClient.coins.all();
    return data
}

module.exports = gekoFetch