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

    module.side = (state= sideState,{payload,type})=> {

        let newState= {...state}
        switch(type){
            case types.UPDATE:
                const {data,norme,main} = payload

                newState.data = {...state.data,...data};
                newState.main = !is_nil(main) ? main : true;
                newState.norme = norme;
                newState.avg = (parseFloat(newState.data[0]) +  parseFloat(newState.data[1]) +  parseFloat(newState.data[2])) / 3


                return newState
            break;

        }



        return state;
    }


    module.reducer = createReducer(initialState, {
        [types.UPDATE]: (state,action)=> {
            const {type,payload} = action;
            const {left,right,normes} = payload;
            
            if(is_nil(normes)){
                throw new Error('No norm given, this will fail')
            }
            
            let newLeft = {...left,norme:normes.fds};
            let newRight = {...right,norme:normes.fds};
            if(newLeft.main ===false && newRight.main === false){
                newRight.main = true;
                newLeft.main = true;
            }
            if(newLeft.main){
                newLeft.norme = normes.fds_main
            }
            if(newRight.main){
                newRight.norme = normes.fds_main
            }

            return {
                left: module.side(state.left,{type,payload:newLeft}),
                right: module.side(state.right,{type,payload:newRight})
            }
        }
    })



    return module;
}