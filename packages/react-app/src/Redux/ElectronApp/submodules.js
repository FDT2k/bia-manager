import DexieModule from '@/Redux/DexieDB'
import SQLiteModule from '@/Redux/SQLite'
import BIASearchModule from '@/Redux/BIASearch'
import PatientModule from '@/Redux/Patient';
import ListsModule from '@/Redux/Lists';
import EditorModule from '@/Redux/Editor';
import FormSettingsModule from '@/Redux/FormSettings'
import { compose,trace } from '@karsegard/composite-js';
import {Modules} from '@karsegard/react-redux'

export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
        backends:{
            dexie:  DexieModule(compose(state => state.backends.dexie, baseSelector), `${prefix}_DEXIE`),
            sqlite:  SQLiteModule(compose(state => state.backends.sqlite, baseSelector), `${prefix}_SQLITE`)
        },
        features:{
            lists: ListsModule(compose(state=> state.features.lists,baseSelector),`${prefix}_LISTS`),
            form_settings: FormSettingsModule(compose(state=> state.features.form_settings,baseSelector),`${prefix}_FORM_SETTINGS`),

           
            search: BIASearchModule(compose(state=> state.features.search,baseSelector) , `${prefix}_SEARCH`),
            create: PatientModule(compose(state=> state.features.create,baseSelector) , `${prefix}_SUBJECT`),
            editor:EditorModule(compose(state=> state.features.editor,baseSelector), `${prefix}_EDITOR`),
            list_editor: Modules.FilterableCollection(compose(state=> state.features.list_editor,baseSelector), `${prefix}_LIST_EDITOR`,{default_key:'_id'})
        }
    }
    

    
    
    return module
}


export default createSubModules;