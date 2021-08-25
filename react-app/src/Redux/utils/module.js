import { enlist, map, safe_path,compose } from "@karsegard/composite-js";
import { keyval } from "@karsegard/composite-js/ObjectUtils";
import { mergeAll } from "@karsegard/composite-js/List";


const createModule = moduleParts => (baseSelector, prefix = '') => {



    const moduleKeys = Object.keys(moduleParts)
    const finalModule = {
        baseSelector,
        prefix
    }
    const getModule = _ => finalModule;

    for (let i = 0; i < moduleKeys.length; i++) {
        const key = moduleKeys[i]

        if (process.env.NODE_ENV !== 'production') {
            if (typeof moduleParts[key] === 'undefined') {
                console.warn(`No module part provided for key "${key}"`)
            }
        }


        if (typeof moduleParts[key] === 'function') {
            finalModule[key] = moduleParts[key](getModule)
        }
    }


    return finalModule;


}


export const exportModule = (keyenhancer,path,module)=>{

    const modulePart = safe_path({},path,module);

    const enhanceKey = item=> {
        const [key,value] = keyval(item);
        return {[keyenhancer(key)]:value}
    }

    const _export = compose (mergeAll,map(enhanceKey),enlist)

    return _export(modulePart);
}



export const suffix_key = suffix => key => {
    return `${key}_${suffix}`;
}



export const prefix_key = suffix => key => {
    return `${suffix}_${key}`;
}



export default createModule;