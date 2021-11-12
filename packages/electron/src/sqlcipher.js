
//var sqlite3 = require('better-sqlite3-sqleet');



const getSubjects = db => ()=> {

    db.prepare("Select * from subjects")
}


const opendb = (file, key = '') => new Promise((resolve, reject) => {
    const db = new sqlite3(file, { verbose: console.log });

    db.pragma("key='"+key+"'");

    db.prepare("SELECT * FROM hello").all()

   /* db.run("PRAGMA key = '" + key + "'", (err) => {
        console.log('apply key',err);
        if(err!==null){
            reject(err)
        }
    });
    db.run("SELECT count(*) FROM sqlite_master", (err) => {
        console.log('check',err);
        if(err!==null){
            reject(err)
        }
    });
*/
    return resolve({
        db,
        file,
    })

})


export default opendb;