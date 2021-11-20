import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider } from '@karsegard/react-bia-manager'

import { useFileProvider } from '@/Context/File'

export default ({ children }) => {

    const { actions: { sqlite_query } } = useElectron();
    const { selectors: { locked } } = useFileProvider();
    const [subject, setState] = useState({})

    useEffect(() => {
        if (!locked) {
           /* sqlite_query({ query: "select s.* from subjects as s left join mesures as m on s.id=m.subject_id where s.firstname like 's%' ;", values: {} }).then(res => {
                setState(res)
            })*/
        }
    }, [locked])
    return (
        <BackendProvider type="sqlite">
            {/*<pre>{JSON.stringify(subject, null, 3)}</pre>*/}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
