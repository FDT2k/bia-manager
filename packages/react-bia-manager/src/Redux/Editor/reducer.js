import EMPTY_MESURE from '@/references/mesure-schema';
import { safe_path } from '@karsegard/composite-js';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { combineReducers, createReducer, handlers } from '@karsegard/react-redux';




const { updateList, updateProp,delete_from_list_by_index }  = handlers;



export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};


    module.examinator = createReducer("",{
        [types.SET_EXAMINATOR]: (state,{payload}) => payload
    })


    module.current_patient_id = createReducer(-1, {
        [types.EDIT_PATIENT]: (state, { payload }) => payload.id
    });


    module.current_mesure_id = createReducer(-1, {
        [types.EDIT_MESURE]: (state, { payload }) => payload.mesure_id,
        [types.SELECT_MESURE]: (state, { payload }) => payload.mesure_id
    });

   
    module.mesure = (state={mesure:{}},action)=> {

        switch(action.type){

            case types.EDIT_MESURE:
                return {
                    mesure: {
                       
                        ...action.payload.mesure,
                       
                        fds: submodules.fds.reducer(action.payload.mesure.fds,action)
                    }
                }


            case types.CHANGE_MESURE:
            case types.CHANGE_MESURE_SILENT:
                return {
                    mesure: {
                        ...state.mesure,
                        ...action.payload.mesure,
                        
                        
                    }
                }
            
            case types.RECOMPUTE_MESURE:
                return {
                    mesure:{
                        ...state.mesure,
                        bia:[...action.payload.bia]
                    }
                }

            case types.CREATE_MESURE:
                return {
                    mesure:{
                        ...action.payload.mesure
                    }
                }
            case types.CLEAR_BIA:
                return {
                    mesure:{
                        ...state.mesure,
                        bia:[]
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
        [types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.headers]

        }

    })
    module.recap_list = createReducer([], {
        [types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.recap]

        }
    })

    module.recap_mass_chart = createReducer([], {
        [types.UPDATE_RECAP]: (state, { payload }) => {
            return [...payload.chart]

        }
    })


    module.recap = createReducer({}, {
        [types.EDIT_PATIENT]: (state, { payload }) => updateProp(payload.id, state, { headers: [], list: [] }),
        [types.UPDATE_RECAP]: (state, action) => {
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
        [types.SAVE]: (state, action) => {
            const {payload} = action;
            if(payload.mesure_id >= state.length){
                return [...state,payload.mesure];
            }
            return updateList((_,idx)=> idx==action.payload.mesure_id,state,_=>action.payload.mesure)
        },
    });

    module.patient = createReducer({}, {
        [types.ADDED_PATIENT]: (state, { payload }) => ({...payload}),
        [types.EDIT_PATIENT]: (state, { payload }) => ({...payload}),
        [types.CHANGE_SUBJECT]: (state, { payload }) => {
            const [rest, patient] = spreadObjectPresentIn(['mesures', 'mesures_dates'], payload.patient);
            return {...state,...patient}
        },
        [types.SAVE]: (state, action) => {

            const mesures = safe_path([],`mesures`,state);
            let new_mesures = module.patient_mesures(mesures,action);
            let res =  
                {
                    ...state,
                    mesures: new_mesures,
                    mesure_count : new_mesures.length
                }
            

            return res
        },
        [types.DELETE_MESURE]: (state, action) => {

            const {payload} = action;
            const mesures = safe_path([],`mesures`,state);
            let res = 
                {
                    ...state,
                    mesures:  delete_from_list_by_index(mesures,payload.mesure_id) /*mesures.map( (mesure,idx) => {
                        if(idx == payload.mesure_id){
                            mesure.status='deleted'
                            mesure.deleted_on= new Date()
                        }
                        return mesure
                    })*/
                }
            
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
        [types.ERROR_EDIT_PATIENT_UNDEF]: (state, action) => ({ has_error: true, message: "subject not found" }),
        [types.EDIT_PATIENT]: (state, action) => ({ has_error: false, message: "" })
    })


    module.clean = createReducer(true,{
        [types.CHANGE_MESURE]: (state, action) => (false),
        [types.EDIT_MESURE]: (state, action) => (true),
        [types.CREATE_MESURE]: (state, action) => (true),
        [types.SAVE]: (state, action) => (true),
        [submodules.fds.types.UPDATE]:  (state, action) => (false),
    });

    module.reducer = combineReducers({
        clean: module.clean,
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