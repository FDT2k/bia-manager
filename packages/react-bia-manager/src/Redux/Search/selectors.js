import { enlist, is_nil, keys } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { createSelector } from '@karsegard/react-redux';





export default getModule => {
    const { baseSelector } = getModule();

    const module = {};


    module.select_patients = createSelector(baseSelector, state =>{
        return state.patients

    } );
    module.select_tags = createSelector(baseSelector, state => state.tags);
    module.select_patients_list = createSelector(module.select_patients, (state) => state.allIds.map(key => state.byIds[key]));
    module.select_count_results = createSelector(baseSelector, state => state.patients.allIds.length);

    module.select_patients_list_filtered = createSelector(module.select_patients, (state) => {

        if (state.filtered.length === 0)
            return [];

        return state.filtered[state.filtered.length - 1].ids.map(key => state.byIds[key])
    });


    module.select_patient = patient_id => createSelector(module.select_patients, (state) => {
        return state.byIds[patient_id];
    })




    module.select_custom_filters = createSelector(baseSelector,state=> state.custom_filters)

    module.has_custom_filters = createSelector(module.select_custom_filters,state => {

        let result = false; 
        enlist(state).map(item=> {
            let [key,value]=keyval(item);
            if(!is_nil(value) && result===false){
                result = true
            }
        })
        return result;
    })
    return module;

}


