"use strict";
var telegramMessenger = require('../helpers/telegramMessenger');
var Welcome = function (telegram, message, db) {
    var welcomeMessage = "you wonder how you can talk to me? just tell me the name and diminutive of a cryptocurrency and I'll give you its current dollar value. try to type btc and send";
    telegramMessenger(telegram, message.chat.id, welcomeMessage);
};
module.exports = Welcome;
