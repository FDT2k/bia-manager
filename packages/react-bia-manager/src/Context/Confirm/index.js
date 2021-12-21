import React, { createContext, useContext,useEffect, useState } from 'react';


import { is_nil } from '@karsegard/composite-js';

export const Context = createContext(null)




export const makeProvider = (Context) => (props) => {
    const { children } = props;

    const [confirm, setConfirm] = useState({
        prompt: "",
        isOpen: false,
        proceed: null,
        cancel: null,
        okLabel:'proceed',
        cancelLabel:'cancel'
    });


    return (
        <Context.Provider value={[confirm, setConfirm]}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useConfirm must be used within a provider');
    }
    const [needsCleanup, setNeedsCleanup] = useState(false);
    const [confirm, setConfirm]  = context;
    

    const isConfirmed = (prompt,{ok:okLabel,cancel:cancelLabel}) => {
        setNeedsCleanup(true);
        const promise = new Promise((resolve, reject) => {
            setConfirm({
                prompt,
                okLabel,cancelLabel,
                isOpen: true,
                proceed: resolve,
                cancel: reject
            });
        });
        return promise.then(
            () => {
                setConfirm({ ...confirm, isOpen: false });
                return true;
            },
            () => {
                setConfirm({ ...confirm, isOpen: false });
                return false;
            }
        );
    };
    useEffect(() => {
        return () => {
          if (confirm.cancel && needsCleanup) {
            confirm.cancel();
          }
        };
      }, [confirm, needsCleanup]);
    
    return {
        ...confirm,
        isConfirmed
    };
}


export const Provider = makeProvider(Context);

export const useConfirm = makeUse(Context);





