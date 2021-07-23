import React, { createContext } from 'react'

const Context = createContext(null)

export { Context }


export groupFocusHandler = _=> {
    return {


    }
}


export const useFocusGroup =  () => useContext(Context);


export const Provider = ({ children,dbname,dbtype }) => {

    let api = groupFocusHandler();

    return (
        <Context.Provider value={{api}}>
            {children}
        </Context.Provider>
    )
}
