import {Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

interface Router {
    telegram:any,
    message:Message,
    routeVerified:boolean,
    db:Database
}

class Router{
    constructor(telegram:any,message:Message,db:Database){
        this.telegram = telegram
        this.message = message
        this.routeVerified = false
        this.db = db

    }
    RouteVerified(){
        this.routeVerified = true
        return this.routeVerified
    }
    Command(cmd:string,callback:any){
        console.log(this.routeVerified)
        if(this.routeVerified!==false) return 0
        //console.log('Command is called')
        if(cmd===this.message.text && cmd[0]==='/'){
            callback(this.telegram,this.message,this.db)
            this.RouteVerified()
        }
    }
    Link(url:string,callback:any){
        if(!this.routeVerified) return 0
        else if(url===this.message.text){
            callback(this.telegram,this.message,this.db)
            this.RouteVerified()
            return 0
        }
    }
    DefaultLink(callback:any){
        if(this.routeVerified) return 0
        console.log('DefaultLink is called')
        callback(this.telegram,this.message,this.db)
        this.RouteVerified()
    }
}

export default  Router