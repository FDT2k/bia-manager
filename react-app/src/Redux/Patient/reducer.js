import { spreadObjectPresentIn, spreadObjectBeginWith, forwardPropsRemovingHeader } from '@karsegard/composite-js/ReactUtils'
import { as_safe_path, enlist, is_nil, map, safe_path } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { combineReducers } from 'redux';
import createReducer from 'Redux/utils/create-reducer';
import { updateList, updateProp } from 'Redux/utils/handlers';

import EMPTY_SUBJECT from 'references/subject-schema';


export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};




  
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




    module.editor_options = combineReducers({
        pathological_groups: module.option_reducer('groups.patho', submodules.pathological_groups.reducer),
        ethno_groups: module.option_reducer('groups.ethno', submodules.ethno_groups.reducer),
        genders: module.option_reducer('gender', submodules.genders.reducer),
    });



    module.empty_subject = (state = { empty: EMPTY_SUBJECT, current: {}, editor_options: {} }, action) => {
        const editor_options = module.editor_options(state.editor_options, action);


        let current = {
            ...state.empty,
        }

        //assign defaults values to schema
        map(item => {
            let [_, option] = keyval(item);

            current = as_safe_path(option.path, current, option.default)
        })(enlist(editor_options));

        return {
            ...state,
            current,
            editor_options
        }
    };


    module.subject_form = createReducer({},{
        [action_types.CHANGE]: (state,{payload})=> ({...payload})
    });

    module.reducer = combineReducers({
        options: module.editor_options,
        empty_subject:module.empty_subject,
        subject_form: module.subject_form
    });

    return module;
}