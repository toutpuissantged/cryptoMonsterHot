"use strict";
var CryptoNotify = /** @class */ (function () {
    function CryptoNotify(telegram, message) {
        this.telegram = telegram;
        this.message = message;
        this.state = {};
    }
    CryptoNotify.prototype.Check = function () {
        var date = new Date().getTime();
        console.log(date);
    };
    return CryptoNotify;
}());
