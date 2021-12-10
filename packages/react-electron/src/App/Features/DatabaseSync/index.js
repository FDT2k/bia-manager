import React, { useEffect, useRef, useState } from 'react'
import { DatabaseSyncFeature, useConfirm } from '@karsegard/react-bia-manager';
import { useElectron } from '@/Context/Electron';
import { useHostProvider } from '@/Context/Host';
import { useBackend, useTranslation, Button, Modal } from '@karsegard/react-bia-manager';
import ReduxModule from '@/Redux/Sync';
import { store } from '@/Store'

import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout'

import { useSelector, useDispatch } from '@karsegard/react-redux';
import { useInterval } from '@karsegard/react-hooks';

export const Module = ReduxModule(state => state.sync, 'sync', {});
export const { actions, selectors } = Module;
store.manager.addModule(Module);


export default props => {
    const { ready, db_name, attach, detach_all, attached_stats_query, attached_sync } = useBackend();
    const { add_error } = useHostProvider();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const files = useSelector(selectors.files)
    const hashes = useSelector(selectors.hashes)
    const status = useSelector(selectors.status)
    const is_ready = useSelector(selectors.ready)
    const ready_to_scan = useSelector(selectors.ready_to_scan)
    const done = useSelector(selectors.done)
    const files_by_hashes = useSelector(selectors.files_by_hashes)

    const [shouldUpdateStatus, setShouldUpdateStatus] = useState(false)
    const { isConfirmed } = useConfirm();

    const current = useSelector(selectors.current);
    const [ack, setAck] = useState(false)
    const [locked, setLocked] = useState(false)
    useEffect(() => {
        if (!ready) {
            add_error(t('Vous devez ouvrir une base avant de synchroniser'))
        }
    }, [ready])

    useEffect(() => {
        return () => {
            detach_all();
        }
    }, [])

    useEffect(() => {
        if (shouldUpdateStatus) {
            console.log(files, status);
            hashes.map(hash => {
                let s = status[hash];

                switch (s) {
                    case 'added':
                        /*   attach(files_by_hashes[hash].path,hash ).then(res => {
                               dispatch(actions.attach(hash));
                           }).catch(err => {
                               dispatch(actions.error(hash))
                               add_error(err)
                           }
                           )*/
                        break;
                    /*  case 'attached':
                          attached_stats_query(hash).then(res=> {
  
                              dispatch(actions.scanned(hash,res));
                          }).catch(err => {
                              dispatch(actions.error(hash))
                              add_error(err)
                          }
                          );
                      break;*/
                    /*  case 'scanned':
                          dispatch(actions.importing(hash));
                          attached_sync (hash) .then(res=> {
                              dispatch(actions.synced(hash));
  
                          }).catch (err=> {
                              add_error(err)
                          })
                      break;*/
                }
            })
            // setShouldUpdateStatus(false);
        }
    }, [shouldUpdateStatus, status])


    const handleDrop = files => {
        if (!locked) {
            Promise.resolve(dispatch(actions.open(files, db_name))).then(res => {
                Promise.all(res.map(item => {
                    attach(item.payload.path, item.payload.hash).then(res => {
                        return Promise.resolve(dispatch(actions.attach(item.payload.hash)))
                    }).catch(err => {
                        add_error(err)

                        return Promise.reject(dispatch(actions.error(item.payload.hash)));
                    }
                    )

                })).then(res => {
                    debugger;
                    setShouldUpdateStatus(true);

                })
            })
        }
    }
    const analyse = _ => {
        setLocked(true);
        hashes.map(hash => {
            attached_stats_query(hash).then(res => {

                dispatch(actions.scanned(hash, res));
            }).catch(err => {
                dispatch(actions.error(hash))
                add_error(err)
            }
            );
        });
    }

    const sync = async _ => {
        setLocked(true);
        isConfirmed(t("Passé cette étape, les bases ne doivent plus être synchronisées. Je confirme que j'ai fait une sauvegarde de mes fichiers")).then(res => {
            if (res === true) {
                hashes.map(hash => {
                    dispatch(actions.importing(hash));
                    attached_sync(hash).then(res => {
                        dispatch(actions.synced(hash));

                    }).catch(err => {
                        add_error(err)
                    })
                });
            }
        })

    }


    return (<>

        <DatabaseSyncFeature files={files} handleDrop={handleDrop}>
            {ready_to_scan && !locked && <Button onClick={analyse}>{t('Analyser')}</Button>}
            {is_ready && <Button onClick={sync}>{t('Importer')}</Button>}
            {done && <Button onClick={_=>window.location.href='#/search'}>{t('Terminé')}</Button>}
        </DatabaseSyncFeature>
        <Modal visible={!ack} type="info">
            <LayoutFlexColumn>
                <h1>{t(`Attention`)}</h1>
                <p>{t(`Cette opération ne doit être faite qu'une seule fois par fichier "enfant"`)}</p>
                <p>{t(`Répéter cette opération avec les mêmes fichiers donnera des résultats différents à chaque essai et peut provoquer une perte de données`)}</p>
                <p>{t(`Conservez une sauvegarde avant de synchroniser`)}</p>


                <Button onClick={_ => setAck(true)}>{t(`J'ai compris`)}</Button>
            </LayoutFlexColumn>
        </Modal>
    </>)
}