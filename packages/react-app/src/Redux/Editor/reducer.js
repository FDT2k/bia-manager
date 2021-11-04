import { spreadObjectPresentIn, spreadObjectBeginWith, forwardPropsRemovingHeader } from '@karsegard/composite-js/ReactUtils'
import { as_safe_path, enlist, is_nil, map, safe_path } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { combineReducers } from 'redux';
import createReducer from '@/Redux/utils/create-reducer';
import { updateList, updateProp,delete_from_list_by_index } from '@/Redux/utils/handlers';

import EMPTY_MESURE from '@/references/mesure-schema';




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

    const { submodules, action_types } = getModule()


    const module = {};


    module.examinator = createReducer("",{
        [action_types.SET_EXAMINATOR]: (state,{payload}) => payload
    })


    module.current_patient_id = createReducer(-1, {
        [action_types.EDIT_PATIENT]: (state, { payload }) => payload.id
    });


    module.current_mesure_id = createReducer(-1, {
        [action_types.EDIT_MESURE]: (state, { payload }) => payload.mesure_id,
        [action_types.SELECT_MESURE]: (state, { payload }) => payload.mesure_id
    });

    /*module.mesure = createReducer({}, {
        [action_types.EDIT_MESURE]: (state, { payload }) => {
            const [bia, mesure] = spreadObjectPresentIn(['bia'], payload.mesure);
            return updateProp(payload.id, state, {
                ...safe_path({}, payload.id, state),
                mesure: {
                    ...safe_path({}, `${payload.id}.mesure`, state),
                    ...mesure

                }
            })
        },
        [action_types.CREATE_MESURE]: (state, { payload }) => {
            let result =  updateProp(payload.id, state, payload)
            return result;
        },
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

    });*/


    module.mesure = (state={mesure:{}},action)=> {

        switch(action.type){

            case action_types.EDIT_MESURE:
                return {
                    mesure: {
                       
                        ...action.payload.mesure,
                       
                        fds: submodules.fds.reducer(action.payload.mesure.fds,action)
                    }
                }


            case action_types.CHANGE_MESURE:
                return {
                    mesure: {
                        ...state.mesure,
                        ...action.payload.mesure,
                        last_update:new Date()
                        
                    }
                }
            
            case action_types.RECOMPUTE_MESURE:
                return {
                    mesure:{
                        ...state.mesure,
                        bia:[...action.payload.bia]
                    }
                }

            case action_types.CREATE_MESURE:
                return {
                    mesure:{
                        ...action.payload.mesure
                    }
                }

        }

        //plugins should flow through here
        return {
            mesure:{
                ...state.mesure,
                fds: submodules.fds.reducer(state.mesure.fds,action)
            },
            
        };
    }
 

    module.recap_headers = createReducer([], {
        [action_types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.headers]

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


    module.patient_mesures = createReducer([], {
        [action_types.SAVE]: (state, action) => {
            const {payload} = action;
            if(payload.mesure_id >= state.length){
                return [...state,payload.mesure];
            }
            return updateList((_,idx)=> idx==action.payload.mesure_id,state,_=>action.payload.mesure)
        },
    });

    module.patient = createReducer({}, {
        [action_types.ADDED_PATIENT]: (state, { payload }) => updateProp(payload.id, state, payload),
        [action_types.EDIT_PATIENT]: (state, { payload }) => updateProp(payload.id, state, payload),
        [action_types.CHANGE_SUBJECT]: (state, { payload }) => {
            const [rest, patient] = spreadObjectPresentIn(['mesures', 'mesures_dates'], payload.patient);
            return updateProp(payload.id, state, {
                ...state[payload.id],
                ...patient
            })
        },
        [action_types.SAVE]: (state, action) => {

            const {payload} = action;
            const {patient_id} = payload;
            const patient = safe_path({},`${patient_id}`,state);
            const mesures = safe_path([],`mesures`,patient);
            let res =  updateProp(patient_id, state, 
                {
                    ...patient,
                    mesures: module.patient_mesures(mesures,action)
                }
            )

            return res
        },
        [action_types.DELETE_MESURE]: (state, action) => {

            const {payload} = action;
            const {patient_id} = payload;
            const patient = safe_path({},`${patient_id}`,state);
            const mesures = safe_path([],`mesures`,patient);
            let res =  updateProp(patient_id, state, 
                {
                    ...patient,
                    mesures:  delete_from_list_by_index(mesures,action.payload.mesure_id)
                }
            )
            return res
        }
        
    })

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
        ],
        bia_report_columns: [
            'bmi',
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

        ],
        bia_report_chart_columns: [
            'ffm',
            'ffmi',
            'fm',
            'fmi',

        ]
    }, {

    })


    module.option_reducer = (path, reducer) => (state = { path, data: {} }, action) => {
        const data = reducer(state.data, action);
        const list = safe_path([], 'list', data);
        const default_value = list.reduce((carry, item) => {
            if (item.default === true) {
                carry = item.id;
            }
            return carry;
        }, null);
        return {
            path,
            data,
            default: default_value
        }
    }





    module.empty_mesure = (state = { empty: EMPTY_MESURE, current: {}, editor_options: {} }, action) => {
      //  const editor_options = module.editor_options(state.editor_options, action);

        
        let current = {
            ...state.empty,
        }
/*
        map(item => {
            let [_, option] = keyval(item);

            current = as_safe_path(option.path, current, option.default)
        })(enlist(editor_options));
*/
        return {
            ...state,
            current,
        //    editor_options
        }
    };

    module.errors = createReducer({ has_error: false, message: "" }, {
        [action_types.ERROR_EDIT_PATIENT_UNDEF]: (state, action) => ({ has_error: true, message: "subject not found" }),
        [action_types.EDIT_PATIENT]: (state, action) => ({ has_error: false, message: "" })
    })


    module.reducer = combineReducers({

        examinator: module.examinator,
        error: module.errors,
        empty_mesure: module.empty_mesure,
        report_settings: module.report_settings,
        current_patient_id: module.current_patient_id,
        current_mesure_id: module.current_mesure_id,
        mesure: module.mesure,
        patient: module.patient,
        recap: module.recap,
        recap_fds: submodules.recap_fds.reducer,

        
        normes: submodules.normes.reducer,       
    });

    return module;
}