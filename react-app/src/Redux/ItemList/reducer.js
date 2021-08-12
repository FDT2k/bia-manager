
import createReducer from 'Redux/utils/create-reducer'
import {byProp,listProp} from 'Redux/utils/handlers';


export default actions_types => {

    const {FETCHED,EDIT,DELETE} = actions_types;

    
    return createReducer({},{
        [FETCHED]: (state,{payload})=> {
            return {
                byIds: byProp('id',payload),
                allIds: listProp('id',payload)
            }
        },
    });
}