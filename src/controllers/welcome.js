const telegramMessenger = require('../helpers/telegramMessenger')

const Welcome  = (telegram,message,db)=>{
    const telegramId = message.chat.id
    console.log(message)
    const welcomeMessage = `hi and welcome ${message.chat.username} , passionate about cryptomonics, so for me it is cryptomonster, in a world where information evolves at the speed of light i will help you to make as much gain as possible in time when money. so ready to get started? let's go`
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

const CreateUser = (telegram,message,db) =>{
    const sql = `INSERT INTO user(telegramId,createdTime) VALUES(?,?)`
    db.run(sql,[message.chat.id,new Date().getTime()], (err) => {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

module.exports = Welcome