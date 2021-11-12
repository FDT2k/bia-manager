import React, { createContext, useContext } from 'react';



export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children,...editorAPI } = props;



   
    return (
        <Context.Provider value={editorAPI}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('useViewProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useEditorProvider = makeUse(Context);





