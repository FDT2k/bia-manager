import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);

    db.version(3).stores({
        patients: "++id,lastname,firstname,birthdate,groups.path,groups.ethno,groups.patho,gender,search_terms,*mesures_dates",
        lists:"++id,key,name"
    });

    const hook = function (primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.path) {
            group = obj.groups.path;
        }
       obj.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
    }
    db.patients.hook("creating",hook );



    const hook2 = function (updated,primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.path) {
            group = obj.groups.path;
        }
        updated.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
    }
    db.patients.hook("updating", hook2);
    return db;
}
