import React, { useRef } from 'react'
import { DatabaseImportFeature } from '@karsegard/react-bia-manager';
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { is_empty, is_nil } from '@karsegard/composite-js';
import { useHostProvider } from '@/Context/Host';
import { useBackend } from '@karsegard/react-bia-manager';
import { is_type_object } from '@karsegard/composite-js';

export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query,
            sqlite_import
        } } = useElectron()

    const { add_error } = useHostProvider()
    const count = useRef(0);

    const { fetch_stats } = useBackend()
    const callback = async data => {
       // console.log(data.type);
        
        if (data.result) {
            return sqlite_import({ model: 'subject', data: data.result.list }).then(res => {
                count.current += data.count
                console.log('imported rows:', count.current);
                return sqlite_import({ model: 'list', data: data.result.collectors })

            }).then(res => {

                return true;
            }).catch(res => {
                add_error(res)
                throw new Error(res.message);
            })

        }
        return true;
    }


    const finish = _ => {
        fetch_stats()
        window.location.href = '#/search'
    }
    return (<DatabaseImportFeature callback={callback} handleDone={finish} />)
}