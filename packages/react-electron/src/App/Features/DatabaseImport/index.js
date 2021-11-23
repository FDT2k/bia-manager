import React,{useRef} from 'react'
import { DatabaseImportFeature } from '@karsegard/react-bia-manager';
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { is_empty, is_nil } from '@karsegard/composite-js';
import {useHostProvider} from '@/Context/Host';

export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query,
            sqlite_import
        } } = useElectron()

    const {add_error} = useHostProvider()
        const count = useRef(0);
    const callback = async data => {
        console.log(data.type);
        debugger;
      
        if (data.result) {
            return sqlite_import({model:'subject',data:data.result.list}).then(res => {
                count.current+=data.count
                console.log('imported rows:',count.current);
                return sqlite_import({model:'list',data:data.result.collectors})
                
            }).then(res =>{

                return true;
            }).catch( res => {
                add_error(res)
                throw new Error(res.message);
            })
           
        }
        return true;
    }

    return (<DatabaseImportFeature callback={callback} />)
}