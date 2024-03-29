
import { combineReducers } from 'redux';
import createReducer from '@/Redux/utils/create-reducer';
import { addToListUniq, delFromList,updateProp } from '@/Redux/utils/handlers';



export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.tags = createReducer([], {
        [action_types.ADD_SEARCH_TAG]: addToListUniq,
        [action_types.UPDATE_SEARCH_TAGS]: (state, action) => [...action.payload],
        [action_types.DEL_SEARCH_TAG]: delFromList,
        [action_types.CLEAR]: (state) => []
    });


    module.patients = createReducer({ byIds: {}, allIds: [], filtered: [] }, {
        [action_types.FETCHED_PATIENTS]: (state, action) => {
            const patients = action.payload.map(item => item.id);
            return {
                byIds: action.payload.reduce((carry, item) => {
                    carry[item.id] = item;
                    return carry;
                }, {}),
                allIds: patients,
                filtered: [{ tag: '', ids: patients }]
            }
        },
        [action_types.CLEAR]: (state, action) => {
            return {
                byIds: {},
                allIds: [],
                filtered: [{ tag: '', ids: [] }]
            }
        },
        [action_types.FILTER_PATIENTS]: (state, action) => {
            let tag = action.payload;


            let patients = state.byIds

            let items = state.filtered.length > 0 ? state.filtered[state.filtered.length - 1].ids : []; // getting the latest filter result

            let result = items.reduce((carry, id) => {
                let patient = patients[id];
                let hasField = tag.indexOf(':') !== -1;
                if (hasField) {
                    let fieldpos = tag.indexOf(':');
                    let key = tag.substr(0, fieldpos).trim();
                    let value = tag.substr(fieldpos + 1).trim();

                    let re = new RegExp(`^${value}`, "gmi");
                    if (re.test(patient[key])) {
                        carry.ids.push(id)
                    }
                } else {
                    if ((new RegExp(`${tag}`, "gmi")).test(patient['search_terms'])) {
                        carry.ids.push(id)
                    }
                }
                return carry;
            }, { tag, ids: [] });

            return {
                ...state,
                filtered: [...state.filtered, result]
            };
        },
        [action_types.REMOVE_FILTER]: (state, action) => {
            return {
                ...state,
                filtered: [state.filtered[0]]
            }
        }

    });




    module.custom_filters = createReducer({},
        {
            [action_types.ADD_CUSTOM_FILTER]: (state, {payload}) => {
                return {
                    ...state,
                    [payload.field]:{...payload.filter}
                }
            },
            [action_types.CLEAR_CUSTOM_FILTER]: (state,{payload})=> {
                return updateProp(payload,state,null)
            }

        }
    )


    module.reducer = combineReducers({
        tags: module.tags,
        patients: module.patients,
        custom_filters: module.custom_filters
    });





    return module;
}

