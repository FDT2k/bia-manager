import { spreadObjectPresentIn, spreadObjectBeginWith, forwardPropsRemovingHeader } from '@karsegard/composite-js/ReactUtils'
import { as_safe_path, enlist, is_nil, map, safe_path } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { combineReducers } from 'redux';
import createReducer from '@/Redux/utils/create-reducer';
import { updateList, updateProp } from '@/Redux/utils/handlers';

import EMPTY_SUBJECT from '@/references/subject-schema';


export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.reducer = combineReducers({
        options: module.editor_options,
        empty_subject:module.empty_subject,
        subject_form: module.subject_form
    });

    return module;
}