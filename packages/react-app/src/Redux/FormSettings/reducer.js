import { createReducer, combineReducers } from '@karsegard/react-redux';


const initialState = {
    forms: {
        subject: {
            lists: [
                { key: 'gender', list: 'genders', path: 'gender' },
                { key: 'ethno', list: 'ethnological_groups', path: 'groups.ethno' },
                { key: 'patho', list: 'pathological_groups', path: 'groups.patho' },
            ]
        },
        subject_quickedit: {
            lists: [
                { key: 'gender', list: 'genders', path: 'gender' },
                { key: 'patho', list: 'pathological_groups', path: 'groups.patho' },
            ]
        },
        mesure: {
            lists: [
                { key: 'sport_rate', list: 'physical_activity_rate', path: 'sport.rate' },
                { key: 'sport_type', list: 'physical_activity_type', path: 'sport.type' },
                { key: 'machine', list: 'machines', path: 'machine' },
                { key: 'examinator', list: 'examinators', path: 'examinator', default_value: 'Fabien' },
            ]
        }
    }

}


export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};

    module.reducer = createReducer(initialState, {})


    return module;
}