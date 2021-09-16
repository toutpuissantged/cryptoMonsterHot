const os  = require('os')
require('dotenv').config()

const IsProd = () =>{
    const my_os = os.type()
    const DEV_OS_NAME = process.env.DEV_OS_NAME
    return my_os!==DEV_OS_NAME
}

module.exports = IsProd