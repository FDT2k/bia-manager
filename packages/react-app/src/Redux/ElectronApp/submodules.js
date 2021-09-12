import DexieModule from '@/Redux/DexieDB'
import BIASearchModule from '@/Redux/BIASearch'
import PatientModule from '@/Redux/Patient';
import SubjectOptionModule from '@/Redux/SubjectOptionList';

import { compose,trace } from '@karsegard/composite-js';


export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`)
        },
        features:{
            options: SubjectOptionModule(compose(state=> state.features.options,baseSelector) , `${prefix}_OPTIONS`),
            search: BIASearchModule(compose(state=> state.features.search,baseSelector) , `${prefix}_SEARCH`),
            create: PatientModule(compose(state=> state.features.create,trace('yey'),baseSelector) , `${prefix}_SUBJECT`)
        }
    }
    

    
    
    return module
}


export default createSubModules;