import {Modules} from '@karsegard/react-redux'
import {compose} from '@karsegard/composite-js'
export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {}
    
    module.collection=Modules.Collection(compose(state => state.collection, baseSelector), `${prefix}_COLLECTION`,{default_key:'key'})
    
    return module
}


export default createSubModules;