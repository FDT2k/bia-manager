import DexieModule from '@/Redux/DexieDB'
import { compose } from '@karsegard/composite-js';

export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {backends:{}}

    
    module.backends.dexie=  DexieModule(compose(state => state.dexie, baseSelector), `${prefix}_DEXIE`);
    
    return module
}


export default createSubModules;