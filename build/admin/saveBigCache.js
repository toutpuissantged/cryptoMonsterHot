"use strict";
var telegramMessenger = require('../helpers/telegramMessenger');
var gekoFetch = require('../helpers/coinGekoFech');
var SaveCache = require('../core/saveCache');
var SaveBigCache = function (telegram, message, db) {
    var chatId = message.chat.id;
    var text = message.text.toLowerCase();
    telegramMessenger(telegram, chatId, 'the bigCache Systeme start ...');
    gekoFetch(message).then(function (res) {
        //console.log(res.data)
        res.data.map(function (data, index) {
            if (text === '/bigcache') {
                [data.id, data.symbol].map(function (name, index) {
                    message.text = name;
                    SaveCache(data, message, db);
                });
            }
            if ((index + 1) === res.data.length) {
                telegramMessenger(telegram, chatId, 'the bigCache Systeme is successfully update database');
            }
        });
    })
        .catch(function (err) {
    })
        .finally(function () {
    });
};
module.exports = SaveBigCache;
