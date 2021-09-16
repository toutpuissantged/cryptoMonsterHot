"use strict";
var Router = /** @class */ (function () {
    function Router(telegram, message, db) {
        this.telegram = telegram;
        this.message = message;
        this.RouteVerified = false;
        this.db = db;
    }
    Router.prototype.RouteVerified = function () {
        this.RouteVerified = true;
    };
    Router.prototype.Command = function (cmd, callback) {
        console.log(this.RouteVerified);
        if (this.RouteVerified !== false)
            return 0;
        console.log('Command is called');
        if (cmd === this.message.text && this.message.entities[0].type === 'bot_command') {
            callback(this.telegram, this.message, this.db);
            this.RouteVerified();
        }
    };
    Router.prototype.Link = function (url, callback) {
        if (!this.RouteVerified)
            return 0;
        else if (url === this.message.text) {
            callback(this.telegram, this.message, this.db);
            this.RouteVerified();
            return 0;
        }
    };
    Router.prototype.DefaultLink = function (callback) {
        if (this.RouteVerified)
            return 0;
        console.log('DefaultLink is called');
        callback(this.telegram, this.message, this.db);
        this.RouteVerified();
    };
    return Router;
}());
module.exports = Router;
