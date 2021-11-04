import { updateList, updateProp } from '@/Redux/utils/handlers';
import { reduceListByKeys, enlist, is_nil, safe_path } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';
import { combineReducers } from 'redux';



export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};

    const initialState = {
        mesures: [],
        headers: [],
        recap: []
    }



    module.mesures = createReducer([], {
        [types.CLEAR]: (state, action) => ([]),
        [types.ADD_MESURE]: (state, action) => ([...state, action.payload])
    });



    module.headers = createReducer([], {
        [types.CLEAR]: (state, {payload}) => ([]),
        [types.ADD_MESURE]: (state, {payload}) => {
            return payload.map(item => item.date);
        }
    })

    module.recap = createReducer([], {
        [types.REFRESH] : (state,{payload}) => {
            return 
        }
    });

    module.refresh = (state)=> {
        return ['left','right'].reduce ( (carry,side)=>{
            let values = state.mesures.reduce((_values,mesure)=>{
                _values[mesure.date] = safe_path('N/A',`fds.${side}.avg`,mesure);
                return _values;
            },{})

            let norme = safe_path("N/A", `mesures.${state.mesures.length-1}.fds.${side}.norme`,state);

            carry.push({label:side,values, norme  })
            return carry;
        },[])
    }

    module.reducer = (state = initialState, {type,payload}) => {
        let new_mesures 
        let new_state
        switch (type) {

            case types.ADD_MESURE:
                new_mesures = module.mesures(state.mesures,{type,payload});
                return {
                    ...state,
                    mesures:new_mesures,
                    headers:module.headers(state.headers,{type,payload:new_mesures})
                }
            case types.UPDATE_MESURE:
                //replace the latest mesure,
                new_mesures = state.mesures.slice(0,-1)
                new_mesures.push(payload);
                
                new_state=  {
                    ...state,
                    mesures:new_mesures,
                    headers:module.headers(state.headers,{type,payload:new_mesures}),
                }

                return {
                    ...new_state,
                    recap: module.refresh(new_state)

                }

            break;
            case types.CLEAR:
                return initialState;

            case types.REFRESH: 
                return {
                    ...state,
                    recap: module.refresh(state)
                }

        }


        return state;

    }

    return module;
}