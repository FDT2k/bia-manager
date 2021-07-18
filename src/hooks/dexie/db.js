import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);

    db.version(1).stores({
        patients: "++id,lastname,firstname,birthdate,groups.path,search_terms",
        import_mapping:"++id,name"
    });

    const hook = function (primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.path) {
            group = obj.groups.path;
        }
       obj.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group;
    }
    db.patients.hook("creating",hook );

    db.patients.hook("updating", hook);
    return db;
}
