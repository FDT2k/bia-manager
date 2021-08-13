
import createReducer from 'Redux/utils/create-reducer'
import { combineReducers } from 'redux'

import { updateProp } from 'Redux/utils/handlers';


import ItemListModule from 'Redux/ItemList';


/*

export const machines = createReducer(['Nutriguard'],{

});

export const physical_act = createReducer(['élevée'],{

});

export const type_act = createReducer(['endurance','muscu'],{

});


export const examinators = createReducer(['Fabien','Bob'],{

});
*/







export default (getModule) => {

    const { submodules,action_types } = getModule()


    const module = {};



    module.current_patient_id = createReducer(-1, {
        [action_types.EDIT_PATIENT]: (state, { payload }) => payload.id
    });


    module.current_mesure_id = createReducer(-1, {
        [action_types.EDIT_MESURE]: (state, { payload }) => payload.mesure_id,
        [action_types.SELECT_MESURE]: (state, { payload }) => payload.mesure_id
    });

    module.mesure = createReducer({}, {
        [action_types.EDIT_MESURE]: (state, { payload }) => updateProp(payload.id, state, payload),
        [action_types.CREATE_MESURE]: (state, { payload }) => updateProp(payload.id, state, payload),
        [action_types.RECOMPUTE_MESURE]: (state, { payload }) => updateProp(payload.id, state, {
            ...state[payload.id],
            mesure: {
                ...state[payload.id].mesure,
                bia: payload.bia
            }
        }),
        [action_types.CHANGE_MESURE]: (state, { payload }) => updateProp(payload.id, state, {
            ...state[payload.id],
            mesure: {
                ...state[payload.id].mesure,
                ...payload.mesure
            }
        }),

    });


    module.recap_headers = createReducer([], {
        [action_types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.headers.map(item => item.toString())]

        }

    })
    module.recap_list = createReducer([], {
        [action_types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.recap]

        }
    })

    module.recap_mass_chart = createReducer([], {
        [action_types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.chart]

        }
    })


    module.recap = createReducer({}, {
        [action_types.EDIT_PATIENT]: (state, { payload }) => updateProp(payload.id, state, { headers: [], list: [] }),
        [action_types.UPDATE_RECAP]: (state, action) => {
            return {
                [action.payload.patient_id]: {
                    headers: module.recap_headers(state.headers, action),
                    list: module.recap_list(state.headers, action),
                    mass_chart: module.recap_mass_chart(state.mass_chart, action),
                }
            }
        }
    });

    module.patient = createReducer({}, {
        [action_types.EDIT_PATIENT]: (state, { payload }) => updateProp(payload.id, state, payload),
    })

/**
 * 
 * state = {
 *  'key' => [values,values]
 * }
 */
    module.norme = createReducer({},{
        [action_types.FETCHED_NORME]:  (state, {payload}) =>  updateProp(payload.key,state,payload.values)

    })

    module.normes= createReducer({},{
        [action_types.FETCHED_NORME]: (state,action) =>{
            const {payload} = action;
            const {patient_id} = payload;
            const substate = module.norme(state[patient_id],action);
            return updateProp(patient_id,state, substate);
        }
    });

    module.report_settings = createReducer({
        bia_result_columns: [
            'water',
            'pct_water',
            'ffm',
            'pct_ffm',
            'ffmi',
            'dffm',
            'pct_dffm',
            'fm',
            'pct_fm',
            'fmi',
            'lf_ratio'
        ],
        bia_report_columns: [
            'water',
            'pct_water',
            'ffm',
            'pct_ffm',
            'ffmi',
            'dffm',
            'pct_dffm',
            'fm',
            'pct_ffm',
            'fmi',

        ],
        bia_report_chart_columns: [
            'ffm',
            'ffmi',
            'fm',
            'fmi',

        ]
    }, {

    })


    module.reducer = combineReducers({
        /*   physical_act,
           type_act,
           machines,
           examinators,*/
        report_settings: module.report_settings,
        physicalActivities: submodules.physicalActivity.reducer,
        current_patient_id: module.current_patient_id,
        current_mesure_id: module.current_mesure_id,
        mesure: module.mesure,
        patient: module.patient,
        recap: module.recap,
        normes:module.normes
    });

    return module;
}