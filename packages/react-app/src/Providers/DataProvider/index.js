import { id } from 'date-fns/locale';
import React, { createContext, useContext } from 'react';



export const Context = createContext(null)


const defaultProvider = {


    getSubject: id => Promise.reject(new Error('not inmplemented')),
    createSubject: id=> Promise.reject(new Error('not inmplemented')),
    updateSubject: id => Promise.reject(new Error('not inmplemented')),
    deleteSubject:  id => Promise.reject(new Error('not inmplemented')),

    createMesure: mesure => Promise.reject(new Error('not inmplemented')),
    getMesure: id => Promise.reject(new Error('not inmplemented')),
    updateMesure : id => Promise.reject(new Error('not inmplemented')),
    deleteMesure: id => Promise.reject(new Error('not inmplemented')),

    updateList : list => Promise.reject(new Error('not inmplemented')),
    getList: key => Promise.reject(new Error('not inmplemented')),
    getLists: _=> Promise.reject(new Error('not inmplemented')),
    countSubjects: _=> Promise.reject(new Error('not inmplemented')),
    countMesures: _=> Promise.reject(new Error('not inmplemented')),


}

export const makeProvider = (Context) => (props) => {
    const { children, provider} = props;




   
    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    )
}



export const makeUse = Context => _ => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('useDataProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useDataProvider = makeUse(Context);





