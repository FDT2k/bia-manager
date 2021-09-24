import DexieModule from '@/Redux/DexieDB'
import BIASearchModule from '@/Redux/BIASearch'
import PatientModule from '@/Redux/Patient';
import SubjectOptionModule from '@/Redux/SubjectOptionList';
import ListsModule from '@/Redux/Lists';
import EditorModule from '@/Redux/Editor';
import FormSettingsModule from '@/Redux/FormSettings'
import { compose,trace } from '@karsegard/composite-js';
import {Modules} from '@karsegard/react-redux'

export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`)
        },
        features:{
            lists: ListsModule(compose(state=> state.features.lists,baseSelector),`${prefix}_LISTS`),
            form_settings: FormSettingsModule(compose(state=> state.features.form_settings,baseSelector),`${prefix}_FORM_SETTINGS`),

            options: SubjectOptionModule(compose(state=> state.features.options,baseSelector) , `${prefix}_OPTIONS`,{
                available_options:{
                    gender: { path: 'gender'},
                    ethno:  { path: 'groups.ethno' },
                    patho:  { path: 'groups.patho' },
                }
            }),
            search: BIASearchModule(compose(state=> state.features.search,baseSelector) , `${prefix}_SEARCH`),
            create: PatientModule(compose(state=> state.features.create,baseSelector) , `${prefix}_SUBJECT`),
            editor:EditorModule(compose(state=> state.features.editor,baseSelector), `${prefix}_EDITOR`),
            list_editor: Modules.FilterableCollection(compose(state=> state.features.list_editor,baseSelector), `${prefix}_LIST_EDITOR`)
        }
    }
    

    
    
    return module
}


export default createSubModules;