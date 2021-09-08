import DexieModule from '@/Redux/DexieDB'
import { compose } from '@karsegard/composite-js';

export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`)
        }
    }

    
    
    return module
}


export default createSubModules;