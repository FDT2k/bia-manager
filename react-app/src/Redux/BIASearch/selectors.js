import {createSelector} from 'reselect';


/*
export const buildFilter = tags => item => {
    for(let i =0; i < tags.length;i++){
        const tag = tags[i];
        let hasField = tag.indexOf(':') !==-1;
        if(hasField){
            let fieldpos = tag.indexOf(':');
            let key = tag.substr(0,fieldpos).trim();
            let value = tag.substr(fieldpos+1).trim();
            //collection = buildFieldQuery(collection)(key,value);
            return (new RegExp(`/${value}/`)).test(item[key]);
        }else{
            //collection=buildQuery(collection)(tag);
        }
    }
}
*/

export const makeSelectors = baseSelector => {

   const select_patients= createSelector(baseSelector, state => state.patients);
   const select_tags= createSelector(baseSelector, state => state.tags);
   const select_patients_list= createSelector(select_patients, (state) => state.allIds.map(key=>state.byIds[key]));
   const select_count_results= createSelector(baseSelector, state => state.patients.allIds.length);

   const select_patients_list_filtered = createSelector(select_patients, (state) =>{

       if(state.filtered.length === 0)
            return [];

       return state.filtered[state.filtered.length-1].ids.map(key=>state.byIds[key])
   });


   const select_patient = patient_id => createSelector(select_patients,(state)=>{
       return state.byIds[patient_id];
   })

       /* (state,tags) => {

        const tag_filter = (tag,patients) => {
            return patients.reduce((carry,id)=>{
                let patient = state.byIds[id];
                let hasField = tag.indexOf(':') !==-1;
                if(hasField){
                    let fieldpos = tag.indexOf(':');
                    let key = tag.substr(0,fieldpos).trim();
                    let value = tag.substr(fieldpos+1).trim();
                    //collection = buildFieldQuery(collection)(key,value);
                    if ((new RegExp(`/${value}/`)).test(patient[key])){
                        carry.push(patient)
                    }
                }
            },[]);
        }

        result = {...state};

        for(tag in tags){
            console.log(tag);
        }

   });*/

   return {
       select_patients,
       select_patients_list,
       select_count_results,
       select_tags,
       select_patients_list_filtered,
       select_patient
   }

}
export default  makeSelectors