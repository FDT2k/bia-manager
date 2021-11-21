import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider } from '@karsegard/react-bia-manager'

import { useFileProvider } from '@/Context/File'

export default ({ children }) => {

    const { actions: { sqlite_search,sqlite_custom_search } } = useElectron();
    const { selectors: { locked } } = useFileProvider();
    const [subject, setState] = useState({})

    const search = async ([tag] )=>{
        
        let result = await sqlite_search(tag)
        return result;
    }

    const search_custom_filters = async (arg )=>{
        let result = await sqlite_custom_search(arg)
        return result;
        return [];
    }

    useEffect(() => {
        if (!locked) {
           /* sqlite_query({ query: "select s.* from subjects as s left join mesures as m on s.id=m.subject_id where s.firstname like 's%' ;", values: {} }).then(res => {
                setState(res)
            })*/
        }
    }, [locked])
    return (
        <BackendProvider type="sqlite" actions={{search,search_custom_filters}}>
            {/*<pre>{JSON.stringify(subject, null, 3)}</pre>*/}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
