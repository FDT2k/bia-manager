
import { enlist, identity, is_nil, is_type_function } from '@karsegard/composite-js';
import { mergeAll } from '@karsegard/composite-js/List';
import { key, value } from '@karsegard/composite-js/ObjectUtils';


export const action_type_namespace = prefix => x => `${prefix}_${x}`


export const renameActionTypes = (action_types, _namefunction) => {

    let namefunction = _namefunction
    if (is_nil(namefunction) || !is_type_function(namefunction)) {
        namefunction = identity;
    }
    return mergeAll(enlist(action_types).map((obj) => {
        const _key = key(obj);
        const _val = value(obj);
        return { [_key]: namefunction(_val) }

    }));

}


export const createActionTypes = (...args) => {

    return args.reduce((result, item) => {
        result[item] = item;
        return result;
    }, {});

}

export const createRenamableActionTypes = namingFn => action_types => (prefix = '') => {
    return renameActionTypes(action_types, namingFn(prefix));

}
export const prefixedActionType = prefix => x => `${prefix}_${x}`

export const createPrefixableActionTypes = createRenamableActionTypes(prefixedActionType)