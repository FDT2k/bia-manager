
import {curry,enlist,identity} from '@karsegard/composite-js'
import {key,value} from '@karsegard/composite-js/ObjectUtils'


export const renameActionTypes = (action_types)=> (namefunction=identity)=>  {

    return enlist(action_types).map((obj)=>{
        const _key = key(obj);
        const _val = value(obj);
        return {[namefunction(key(obj))]: value[obj]}

    });

}


export const createActionTypes = (...args) => {

    return args.reduce((result,item)=>{
        result[item]= item;
        return result;
    },{});

}