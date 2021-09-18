import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

interface Router {
    telegram:any,
    message:Message,
    routeVerified:boolean,
    db:Database
}

class Router{
    /**
     * permet de generer aisement les routes
     * @param telegram @type {Telegram} instance de telegram-bot initialisee
     * @param message @type {Message} objet message renvoyee par l'api telegram
     * @param db @type {Database} instance de la base de donnee creer
     */
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
        /**
         * execute les commandes telegram envoyer
         * @param cmd @type {string} command envoyer par l'utilisateur
         * @param callback @type {any} function a executer si la route est validee
         */
        console.log(this.routeVerified)
        if(this.routeVerified!==false) return 0
        //console.log('Command is called')
        if(cmd===this.message.text && cmd[0]==='/'){
            callback(this.telegram,this.message,this.db)
            this.RouteVerified()
        }
    }
    Link(url:string,callback:any){
        /**
         * traite les messages telegram envoyer
         * @param url @type {string} message envoyer par l'utilisateur
         * @param callback @type {any} function a executer si la route est validee
         */
        if(!this.routeVerified) return 0
        else if(url===this.message.text){
            callback(this.telegram,this.message,this.db)
            this.RouteVerified()
            return 0
        }
    }
    DefaultLink(callback:any){
        /**
         * executes une action si aucun des routes percedentes n'est validee
         * @param callback @type {any} function a executer
         */
        if(this.routeVerified) return 0
        console.log('DefaultLink is called')
        callback(this.telegram,this.message,this.db)
        this.RouteVerified()
    }
}

export default  Router