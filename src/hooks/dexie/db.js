import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);
    db.version(1).stores({
        patients: `++id,nom,prenom`,
        mesures: '++id'
    });
    db.version(2).stores({
        patients: `++id,nom,prenom,dateNaissance`,
        mesures: '++id'
    });
    db.version(3).stores({
        patients: `++id,nom,prenom,dateNaissance,[nom+prenom+dateNaissance]`,
        mesures: '++id'
    });

    return db;
}
