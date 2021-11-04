import { compose, enlist } from '@karsegard/composite-js'
import { keyval } from '@karsegard/composite-js/ObjectUtils';

export default getModule => {
    return {
        register: (key, fn) => {
            const { baseSelector, prefix } = getModule();
            return {
                [key]: fn(compose(state => state[key], baseSelector), `${prefix}_${key}`)
            }
        },
        getReducers: (plugins,state,action)=> {
            return enlist(plugins).reduce((reducers,plugin)=> {
                const [key,module] = keyval(plugin)
                reducers[key]=module.reducer(state[key],action)
                return reducers;
            },{})
        }
    }
}