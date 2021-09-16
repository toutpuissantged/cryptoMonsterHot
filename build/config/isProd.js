"use strict";
var os = require('os');
require('dotenv').config();
var IsProd = function () {
    var my_os = os.type();
    var DEV_OS_NAME = process.env.DEV_OS_NAME;
    return my_os !== DEV_OS_NAME;
};
module.exports = IsProd;
