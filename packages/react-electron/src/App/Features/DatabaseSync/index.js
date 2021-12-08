import React, { useEffect, useRef,useState } from 'react'
import { DatabaseSyncFeature } from '@karsegard/react-bia-manager';
import { useElectron } from '@/Context/Electron';
import { useHostProvider } from '@/Context/Host';
import { useBackend, useTranslation } from '@karsegard/react-bia-manager';
import ReduxModule from '@/Redux/Sync';

import { store } from '@/Store'

import { useSelector, useDispatch } from '@karsegard/react-redux';
import { useInterval } from '@karsegard/react-hooks';

export const Module = ReduxModule(state => state.sync, 'sync', {});
export const { actions, selectors } = Module;
store.manager.addModule(Module);


export default props => {
    const { ready, db_name, attach } = useBackend();
    const { add_error } = useHostProvider();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const files = useSelector(selectors.files)
    const hashes = useSelector(selectors.hashes)
    const status = useSelector(selectors.status)
    const files_by_hashes = useSelector(selectors.files_by_hashes)

    const [shouldUpdateStatus, setShouldUpdateStatus] = useState(false)

    useInterval(() => {

        console.log('interval')
    }, 1000)


    useEffect(() => {
        if (!ready) {
            add_error(t('Vous devez ouvrir une base avant de synchroniser'))
        }
    }, [ready])


    useEffect(() => {
        if (shouldUpdateStatus) {
            console.log(files, status);
            hashes.map(hash => {
                let s = status[hash];

                switch (s) {
                    case 'added':
                        attach({ file: files_by_hashes[hash].path, alias: hash }).then(res => {
                            dispatch(actions.attach(hash));
                        }).catch(err => {
                            dispatch(actions.error(hash))
                            add_error(err)
                        }
                        )
                        break;
                    case 'attached':
                        
                    break;
                }
            })
            setShouldUpdateStatus(false);
        }
    }, [shouldUpdateStatus,status])


    const handleDrop = files => {

        Promise.resolve(dispatch(actions.open(files, db_name))).then(res => {
            setShouldUpdateStatus(true);
        })
    }

    return (<DatabaseSyncFeature files={files} handleDrop={handleDrop} />)
}