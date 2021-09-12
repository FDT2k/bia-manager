import ItemListModule from '@/Redux/ItemList';
import { compose, trace } from '@karsegard/composite-js';


export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
            options: {
                patho: ItemListModule(compose(state => state.options.patho.data, baseSelector), `${prefix}_PATHO`),
                ethno: ItemListModule(compose(state => state.options.ethno.data, baseSelector), `${prefix}_ETHNO`),
                genders: ItemListModule(compose(state => state.options.gender.data, trace('test'), baseSelector), `${prefix}_GENDER`)
            }
        }
    
    return module
}


export default createSubModules;