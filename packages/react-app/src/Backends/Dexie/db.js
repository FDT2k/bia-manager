import Dexie from 'dexie';



export default name => {


    const db = new Dexie(name);

    db.version(5).stores({
        patients: "++id,lastname,firstname,birthdate,groups.path,groups.ethno,groups.patho,gender,search_terms,*mesures_dates",
        lists:"++id,key,name"
    });

    const hook = function (primKey, obj, trans) {
        let group = '';
        if(obj.groups && obj.groups.patho) {
            group = obj.groups.patho;
        }
       obj.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
       obj.mesures_dates = obj.mesures.map(mesure => new Date(mesure.date))

    }
    db.patients.hook("creating",hook );



    const hook2 = function (updated,primKey, obj, trans) {
        let group = '';
        let newstate = {...updated};
        if(obj.groups && obj.groups.patho) {
            group = obj.groups.patho;
        }
        newstate.search_terms = obj.lastname +' '+obj.firstname+' '+obj.birthdate+' '+group+ ' '+obj.firstname+' '+obj.lastname;
        newstate.mesures_dates = obj.mesures.map(mesure => new Date(mesure.date))
  
        return newstate
    }
    db.patients.hook("updating", hook2);
    return db;
}
