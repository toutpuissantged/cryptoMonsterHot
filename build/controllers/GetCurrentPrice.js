"use strict";
var telegramMessenger = require('../helpers/telegramMessenger');
var gekoFetch = require('../helpers/coinGekoFech');
var SaveCache = require('../core/saveCache');
var isProd = require('../config/isProd');
var GetCurrentPrice = function (telegram, message, db) {
    var chatId = message.chat.id;
    var isFound = false;
    var text = message.text.toLowerCase();
    gekoFetch(message).then(function (res) {
        //console.log(res.data)
        res.data.map(function (data, index) {
            if (data.id === text || data.symbol === text) {
                InfoSend(telegram, message, data);
                isFound = true;
                SaveCache(data, message, db);
            }
        });
        if (!isFound) {
            telegramMessenger(telegram, chatId, 'this crypto is not found !!!');
        }
    })
        .catch(function (err) {
    })
        .finally(function () {
    });
};
var InfoSend = function (telegram, message, data) {
    var usd_price = data.market_data.current_price.usd;
    var chatId = message.chat.id;
    var text = message.text.toLowerCase();
    var msg = text + " current value is " + usd_price + " $";
    var image = data.image.large;
    telegramMessenger(telegram, chatId, msg);
    telegram.sendPhoto(chatId, image);
};
var Main = function (telegram, message, db) {
    var Loading = 'loading ...  please wait !!!';
    telegramMessenger(telegram, message.chat.id, Loading);
    if (!isProd()) {
        GetCurrentPrice(telegram, message, db);
    }
    else {
        LoadCache(telegram, message, db);
    }
};
var LoadCache = function (telegram, message, db) {
    var text = message.text.toLowerCase();
    db.all("SELECT data FROM cache WHERE name ='" + text + "'", function (err, row) {
        console.log(row);
        if (err) {
            return console.log(err.message);
        }
        else if (row.length === 0) {
            console.log('row length  = 0');
        }
        // get the last insert id
        else {
            var data = JSON.parse(row[0].data);
            InfoSend(telegram, message, data);
            console.log('name is found in db', row[0]);
        }
    });
};
module.exports = Main;
