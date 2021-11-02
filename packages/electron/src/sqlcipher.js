
var sqlite3 = require('@journeyapps/sqlcipher');


const opendb = (file,key='')=> {
    console.log('hello world')
    const db= new sqlite3.Database(file);
    db.run("PRAGMA key = '"+key+"'");
    db.run("SELECT count(*) FROM sqlite_master");

    return {
        db,
        file,
    }
}

export default opendb;