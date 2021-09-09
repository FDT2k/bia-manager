import DexieModule from '@/Redux/DexieDB'
import BIASearchModule from '@/Redux/BIASearch'
import { compose } from '@karsegard/composite-js';


export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`)
        },
        features:{
            search: BIASearchModule(compose(state=> state.features.search,baseSelector) , `${prefix}_SEARCH`)
        }
    }

    
    
    return module
}


export default createSubModules;