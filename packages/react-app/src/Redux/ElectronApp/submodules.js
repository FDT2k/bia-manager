import DexieModule from '@/Redux/DexieDB'
import BIASearchModule from '@/Redux/BIASearch'
import PatientModule from '@/Redux/Patient';
import SubjectOptionModule from '@/Redux/SubjectOptionList';
import EditorModule from '@/Redux/Editor';

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
            create: PatientModule(compose(state=> state.features.create,baseSelector) , `${prefix}_SUBJECT`),
            editor:EditorModule(compose(state=> state.features.editor,baseSelector), `${prefix}_EDITOR`)
        }
    }
    

    
    
    return module
}


export default createSubModules;