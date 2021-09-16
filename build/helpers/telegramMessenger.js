"use strict";
var telegramMessenger = function (telegram, id, msg) {
    telegram.sendMessage(id, msg);
};
module.exports = telegramMessenger;
