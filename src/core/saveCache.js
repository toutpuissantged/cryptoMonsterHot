const SaveCache = (data,message,db) =>{
    const sql = `INSERT INTO cache(name,data,createdTime,lastUpdated) VALUES(?,?,?,?)`
    const now = new Date().getTime()
    const text = message.text.toLowerCase()
    
    db.all(`SELECT data FROM cache WHERE name ='${text}'`, (err,row) => {
      //console.log(row)
      if (row.length===0) {
        db.run(sql,[text,JSON.stringify(data),now,now], (err) => {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`new row insert`);
        });
        return console.log('error');
      }
      // get the last insert id
      else{
        console.log(`db is already have ${text}`)
        const sql_2 = 'UPDATE cache SET  data=? ,lastUpdated=? WHERE name=?'
        db.run(sql_2,[JSON.stringify(data),now,text], (err) => {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`row is updated`);
        });
      }
      
    })
      
  }

module.exports = SaveCache