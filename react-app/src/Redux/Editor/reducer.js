
import createReducer from 'Redux/utils/create-reducer'
import { combineReducers } from 'redux'

import { updateList, updateListIfPropEqual, updateProp } from 'Redux/utils/handlers';


import ItemListModule from 'Redux/ItemList';
import { enlist,is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';


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
    module.norme = createReducer({}, {
        [action_types.REFRESH_NORME]: (state, { payload }) => updateProp(payload.key, state, payload.values)
    })

    module.normeByGender = createReducer({}, {
        [action_types.FETCHED_NORMES]: (state, action) => {
            let genders = action.payload.genders;
            return enlist(action.payload.normes).reduce((carry, item) => {

                let _key = key(item);
                let _value = value(item);
                carry = genders.reduce(
                    (gen, it) => {
                        let values = _value[it];
                        if (!gen[it]) {
                            gen[it] = {}
                        }
                        gen[it][_key] = values;
                        return gen;
                    }
                    , carry)

                return carry;
            }, {})
        }
    })


    const sample_norm = (gender,key, norm) => {
        let samples = [];
        const [min,max] = norm.values;
        
        if (!is_nil(norm.age_range)) {
            const [age_min, age_max] = norm.age_range;
           // for (let i = age_min; i <= age_max; i++) {
                samples.push({ key, min,max, age: age_min, age_range:norm.age_range,gender })
           // }
        } else {
            samples.push({ key, min,max,  age: norm.age_min,gender })
        }
        return samples;
    }

    module.normeChartSampling = createReducer({}, {
        [action_types.FETCHED_NORMES]: (state, action) => {
            let genders = action.payload.genders;

            let samples= enlist(action.payload.normes).reduce((carry, item) => {

                let _norm_key = key(item);
                let _options = value(item);

                carry = genders.reduce((result, gender) => {
                   

                    let _result =  _options[gender].reduce( (result,norm)=> {
                        let sample =sample_norm(gender,_norm_key, norm)

                       
                      

                        result= [...result,...sample];
                        return result;
                        
                    },[]);

                    return [...result,..._result];
                }, carry);

                return carry;
            }, [])

            return samples.reduce( (list,item)=>{
                const {gender,age_range,age,key} = item;
                if(!list[gender]){
                    list[gender]= [];
                }


                let existing = list[gender].find(item=> item.age===age);

                if(!existing) {

                    list[gender].push( {
                        age,
                        age_range,
                        [`${key}_min`]: item.min,
                        [`${key}_max`]: item.max,

                        [`${key}`]: [item.min,item.max]
                    } );
                }else{

                    list[gender] = updateList(item=> item.age===age,list[gender],element=> {

                        return {
                        ...element,
                        [`${key}_min`]: item.min,
                        [`${key}_max`]: item.max,
                        [`${key}`]: [item.min,item.max]
                        }
                    }).sort((a,b)=>{
                        return a.age-b.age;
                    });
                }

                return list;
            },{})
        }
    })


    module.normes = createReducer({ byPatient: {} }, {
        [action_types.FETCHED_NORMES]: (state, action) => {

            return {
                ...state,
                normes: action.payload.normes,
                byGender: module.normeByGender(state.byGender, action),
                chartSample: module.normeChartSampling(state.chartSample, action)
            }
        },
        [action_types.REFRESH_NORME]: (state, action) => {
            const { payload } = action;
            const { patient_id } = payload;
            const substate = module.norme(state.byPatient[patient_id], action);

            return {
                ...state,
                byPatient: updateProp(patient_id, state.byPatient, substate)
            }
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
        normes: module.normes
    });

    return module;
}