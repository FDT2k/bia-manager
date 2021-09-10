import DexieModule from '@/Redux/DexieDB'
import BIASearchModule from '@/Redux/BIASearch'
import PatientModule from '@/Redux/Patient';

import { compose } from '@karsegard/composite-js';


export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`)
        },
        features:{
            search: BIASearchModule(compose(state=> state.features.search,baseSelector) , `${prefix}_SEARCH`),
            create: PatientModule(compose(state=> state.features.patient,baseSelector) , `${prefix}_SUBJECT`)
        }
    }

    
    
    return module
}


export default createSubModules;