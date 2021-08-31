import { createSelector } from 'reselect';





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



    return module;

}


