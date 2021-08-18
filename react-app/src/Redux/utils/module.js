

const createModule = moduleParts => (baseSelector, prefix = '') => {



    const moduleKeys = Object.keys(moduleParts)
    const finalModule = {
        baseSelector,
        prefix
    }
    const getModule = _ => finalModule;

    for (let i = 0; i < moduleKeys.length; i++) {
        const key = moduleKeys[i]

        if (process.env.NODE_ENV !== 'production') {
            if (typeof moduleParts[key] === 'undefined') {
                console.warn(`No module part provided for key "${key}"`)
            }
        }


        if (typeof moduleParts[key] === 'function') {
            finalModule[key] = moduleParts[key](getModule)
        }
    }


    return finalModule;


}

export default createModule;