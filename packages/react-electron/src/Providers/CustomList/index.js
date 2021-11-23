import React, { useEffect, useState } from 'react';
import { CustomListProvider } from '@karsegard/react-bia-manager';

import { useBackend } from '@karsegard/react-bia-manager';

export default ({ children }) => {


    const { get_lists, get_forms, ready } = useBackend();
    const [lists, setList] = useState({})
    const [forms, setForms] = useState({})





    useEffect(() => {
        if (ready) {
            get_lists().then(res => {
                setList(res)
                return get_forms()
            }).then(forms => {
                setForms(forms)
            })

        }
    }, [ready,get_forms,get_lists])
    return (


        <CustomListProvider lists={lists} forms={forms}>
            {children}

        </CustomListProvider>
    )
}