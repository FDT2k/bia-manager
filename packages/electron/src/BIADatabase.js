
import {format} from 'date-fns'
export default {
    lastname:'',
    firstname:'',
    birthdate:'',
    age:0,
    usual_height: 0,
    usual_weight: 0,
    gender:'M',
    groups:{

    },
    mesures:[]
};

export default  (Database,filename)=>{



    const db = new Database(filename);
    db.exec(`CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lastname TEXT,
        firstname TEXT,
        birthdate TEXT,
        age TEXT,
        usual_height REAL,
        usual_weight REAL,
        age INTEGER,
        sex TEXT
    );`)
    
    db.exec(`CREATE TABLE IF NOT EXISTS mesures(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
    )`)

    return {
        db
    }

}
