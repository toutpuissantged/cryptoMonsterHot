"use strict";
var _this = this;
var telegramMessenger = require('../helpers/telegramMessenger');
var Welcome = function (telegram, message, db) {
    var telegramId = message.chat.id;
    console.log(message);
    var welcomeMessage = "hi and welcome " + message.chat.username + " , passionate about cryptomonics, so for me it is cryptomonster, in a world where information evolves at the speed of light i will help you to make as much gain as possible in time when money. so ready to get started? let's go";
    telegramMessenger(telegram, message.chat.id, welcomeMessage);
    db.serialize(function () {
        var sql = "SELECT telegramId as id FROM user";
        var isRegistred = false;
        db.all(sql, function (err, row) {
            if (err) {
                console.error(err.message);
            }
            row.map(function (data, index) {
                console.log(data.id);
                if (data.id === telegramId) {
                    isRegistred = true;
                }
            });
            if (!isRegistred) {
                CreateUser(telegram, message, db);
            }
        });
    });
};
var CreateUser = function (telegram, message, db) {
    var sql = "INSERT INTO user(telegramId,createdTime) VALUES(?,?)";
    db.run(sql, [message.chat.id, new Date().getTime()], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log("A row has been inserted with rowid " + _this.lastID);
    });
};
module.exports = Welcome;
