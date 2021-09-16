const os  = require('os')
require('dotenv').config()

const IsProd = () =>{
    const my_os:string = os.type()
    const DEV_OS_NAME:string|undefined = process.env.DEV_OS_NAME
    return my_os!==DEV_OS_NAME
}

export default IsProd