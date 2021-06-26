import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);
    db.version(1).stores({
        patients: `++id,nom,prenom`,
        mesures: '++id'
    });

    return db;
}
