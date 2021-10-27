import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);

    db.version(4).stores({
        patients: "++id,lastname,firstname,birthdate,groups.path,groups.ethno,groups.patho,gender,search_terms,*mesures_dates,*mesures",
        lists:"++id,key,name"
    });

    const hook = function (primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.patho) {
            group = obj.groups.patho;
        }
       obj.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
    }
    db.patients.hook("creating",hook );



    const hook2 = function (updated,primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.patho) {
            group = obj.groups.patho;
        }
        updated.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
    }
    db.patients.hook("updating", hook2);
    return db;
}
