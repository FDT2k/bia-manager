import { updateList, updateProp } from '@/Redux/utils/handlers';
import { reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';



export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};

    const sideState = {
        main: false,
        data: {
            0: '',
            1: '',
            2: '',
        },
        avg: '',
        norme: ''
    }
    const initialState = {
        left: {...sideState},
        right: {...sideState}
    }

    module.side = (state= sideState,{payload})=> {


        let newState= {...state}
        switch(action.type){
            case types.UPDATE:
                const {data,norme,main} = payload

                newState.data = {...data};
                newState.main = main;
                newState.norme =  norme[main]
                newState.avg = (parseFloat(data[0]) +  parseFloat(data[1]) +  parseFloat(data[2])) / 3


                return newState
            break;

        }



        return state;
    }


    module.reducer = createReducer(initialState, {
        [types.UPDATE]: (state,action)=> {
            const {type,payload} = action;
            const {left,right} = payload;
            
            
            let newLeft = {...left};
            let newRight = {...right};

            if(newLeft.main ===false && newRight.main === false){
                newRight.main = true;
                newLeft.main = true;
            }
            return {
                left: module.side(state.left,{type,payload:newLeft}),
                right: module.side(state.right,{type,payload:newRight})
            }
        }
    })



    return module;
}