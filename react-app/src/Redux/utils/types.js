
import {curry,enlist,identity} from '@karsegard/composite-js'
import { mergeAll } from '@karsegard/composite-js/List';
import {key,value} from '@karsegard/composite-js/ObjectUtils'


export const renameActionTypes = (action_types)=> (namefunction=identity)=>  {

    return mergeAll(enlist(action_types).map((obj)=>{
        const _key = key(obj);
        const _val = value(obj);
        return {[_key]: namefunction(_val) }

    }));

}


export const createActionTypes = (...args) => {

    return args.reduce((result,item)=>{
        result[item]= item;
        return result;
    },{});

}