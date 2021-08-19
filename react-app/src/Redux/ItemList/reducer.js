
import createReducer from 'Redux/utils/create-reducer';
import { byProp, listProp } from 'Redux/utils/handlers';


export default (actions_types,key='id') => {

    const { FETCHED, EDIT, DELETE } = actions_types;


    return createReducer({ byIds: {}, allIds: [] }, {
        [FETCHED]: (state, { payload }) => {
            return {
                byIds: byProp(key, payload),
                allIds: listProp(key, payload),
                list : payload
            }
        },
    });
}