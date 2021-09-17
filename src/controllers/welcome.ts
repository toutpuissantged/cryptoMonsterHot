import telegramMessenger from '../helpers/telegramMessenger'
import Telegram,{Message} from 'node-telegram-bot-api/index'
import {Database} from 'sqlite3/index'

const Welcome  = (telegram:Telegram,message:Message,db:Database)=>{
  /**
   * message de bienvenue
  * @param telegram @type {Telegram} instance de telegram-bot initialisee
  * @param message @type {Message} objet message renvoyee par l'api telegram
  * @param db @type {Database} instance de la base de donnee creer 
   */
    const telegramId:number = message.chat.id
    console.log(message)
    const welcomeMessage :string= `hi and welcome ${message.chat.username} , passionate about cryptomonics, so for me it is cryptomonster, in a world where information evolves at the speed of light i will help you to make as much gain as possible in time when money. so ready to get started? let's go`
    telegramMessenger(telegram,message.chat.id,welcomeMessage)
    db.serialize(() => {
        const sql = `SELECT telegramId as id FROM user`
        let isRegistred = false
        db.all(sql, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          row.map((data,index)=>{
              console.log(data.id);
              if(data.id===telegramId){
                  isRegistred = true
              }
          })
          if(!isRegistred){
            CreateUser(telegram,message,db)
          }
        });

    });
}

const CreateUser = (telegram:Telegram,message:Message,db:Database) =>{
  /**
   * creer une nouvel utilisateur dans la base de donnee
   */
    const sql = `INSERT INTO user(telegramId,createdTime) VALUES(?,?)`
    db.run(sql,[message.chat.id,new Date().getTime()], (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('user created');
    });
}

export default Welcome