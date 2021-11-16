import React,{useRef} from 'react'
import Component from './component'
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { is_empty, is_nil } from '@karsegard/composite-js';


export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query,
            sqlite_import
        } } = useElectron()

        const count = useRef(0);
    const callback = data => {
        console.log(data.type);
        if (data.post) {
            count.current+=data.count
            sqlite_import(data.post.list)
            console.log('imported rows:',count.current);

        }
        if (data.result) {
            sqlite_import(data.result.list)
            count.current+=data.count
            console.log('imported rows:',count.current);
        }
       
    }

    return (<Component callback={callback} />)
}