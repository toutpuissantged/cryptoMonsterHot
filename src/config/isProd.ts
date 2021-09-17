const os  = require('os')
require('dotenv').config()

const IsProd = () =>{
    /**
   * verifie l'environement d'execution du programme
   */
    const my_os:string = os.type()
    const DEV_OS_NAME:string|undefined = process.env.DEV_OS_NAME
    return my_os!==DEV_OS_NAME
}

export default IsProd