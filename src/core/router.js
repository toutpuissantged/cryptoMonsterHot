class Router{
    constructor(telegram,message){
        this.telegram = telegram
        this.message = message
        this.RouteVerified = false
    }
    RouteVerified(){
        this.RouteVerified = true
    }
    Command(cmd,callback){
        console.log(this.RouteVerified)
        if(this.RouteVerified!==false) return 0
        console.log('Command is called')
        if(cmd===this.message.text && this.message.entities[0].type==='bot_command'){
            callback(this.telegram,this.message)
            this.RouteVerified()
        }
    }
    Link(url,callback){
        if(!this.RouteVerified) return 0
        else if(url===this.message.text){
            callback(this.telegram,this.message)
            this.RouteVerified()
            return 0
        }
    }
    DefaultLink(callback){
        if(this.RouteVerified) return 0
        console.log('DefaultLink is called')
        callback(this.telegram,this.message)
        this.RouteVerified()
    }
}

module.exports = Router