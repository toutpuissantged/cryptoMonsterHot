
class CryptoNotify {
    constructor(telegram,message){
        this.telegram = telegram
        this.message = message
        this.state = {}
    }
    Check(){
        const date = new Date().getTime()
        console.log(date)
    }

}