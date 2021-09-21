import ItemListModule from '@/Redux/ItemList';
import { compose, trace } from '@karsegard/composite-js';


export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {
            options: {
                patho: ItemListModule(compose(state => state.options.patho.data, baseSelector), `${prefix}_PATHO`),
                ethno: ItemListModule(compose(state => state.options.ethno.data, baseSelector), `${prefix}_ETHNO`),
                gender: ItemListModule(compose(state => state.options.gender.data, trace('test'), baseSelector), `${prefix}_GENDER`),
                sport_type: ItemListModule(compose(state => state.options.sport_type.data, trace('test'), baseSelector), `${prefix}_SPORT_TYPE`),
                machine: ItemListModule(compose(state => state.options.machine.data, trace('test'), baseSelector), `${prefix}_MACHINE`),
                sport_rate: ItemListModule(compose(state => state.options.sport_rate.data, trace('test'), baseSelector), `${prefix}_SPORT_RATE`),
            }
        }
    
    return module
}


export default createSubModules;