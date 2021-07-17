import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);

    db.version(1).stores({
        patients: "++id,nom,prenom,dateNaissance,groupePath,search_terms",
        import_mapping:"++id,name"
    });


    db.patients.hook("creating", function (primKey, obj, trans) {
       obj.search_terms = obj.nom +' '+obj.prenom+' '+obj.dateNaissance+' '+obj.groupPath;
    });

    db.patients.hook("updating", function (mods, primKey, obj, trans) {
        obj.search_terms = obj.nom +' '+obj.prenom+' '+obj.dateNaissance+' '+obj.groupPath;

    });
    return db;
}
