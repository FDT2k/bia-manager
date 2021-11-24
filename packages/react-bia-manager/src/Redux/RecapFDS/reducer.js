import { safe_path } from '@karsegard/composite-js';
import { createReducer } from '@karsegard/react-redux';
import {generate_recap_header} from '@/references/Mesure'


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
        [types.ADD_MESURE]: (state, {payload}) => generate_recap_header(payload.length,payload)
    })

    module.recap = createReducer([], {
        [types.REFRESH] : (state,{payload}) => {
            return 
        }
    });

    module.refresh = (state)=> {
        return ['left','right'].reduce ( (carry,side)=>{
            let values = state.mesures.reduce((_values,mesure)=>{
                _values[mesure.date] = safe_path('',`fds.${side}.avg`,mesure);
                return _values;
            },{})


            let norme  = safe_path(null, `mesures.${state.mesures.length-1}.fds.${side}.norme`,state);
            
            values.norme = '';
            if(norme){
                let [min,max] = norme 
                values.norme= `${min}-${max}`
            }
            
            carry.push({label:side,values  })
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