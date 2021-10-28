import React, { useState, useEffect, useRef, useMemo } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import { I18nextProvider } from 'react-i18next';
import i18n, { setHandler } from '@/i18next.electron';

import { useElectron } from '@/Providers/ElectronProvider';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';

import Modal from '@/App/Components/Modal';
import {LayoutFlexColumn,LayoutFlex} from '@karsegard/react-core-layout';
import Button from '@/bia-layout/components/Form/Button';
import ErrorHandler from '@/App/BIA/Features/ErrorMessageHandler'
//const api = makeAPI('electron')


export const Component = props => {


    const { onOpenRequest, onSaveRequest, onLanguageChange, onLocationChange, onCloseRequest, get_translations,onDownloadProgress, missing_translations,download_update, ready, onUpdateAvailable } = useElectron();
    const { open_file, save_to_file, start_loading, stop_loading, current_file, close, init_app } = props;
    const [initialI18nStore, setInitialTranslation] = useState({});

    const [update, setUpdate] = useState(false);
    const [download, setDownload] = useState(null);
    const [updateMessage, setUpdateMessage] = useState({});


    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file()
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(_=> {
                stop_loading();
                console.error()
            });

    }

    const handleFileSave = _ => {
        start_loading('saving');
        save_to_file().then(

            result => {
                stop_loading();
                if (result) {
                    stop_loading();
                }
            }
        ) .catch(_=> {
            stop_loading();
            console.error()
        });

    }

    const handleClose = _ => {
        close().then(res => {
            window.location.hash = '#/'

        })
    }



    useEffect(() => {
        setHandler(missing_translations)
        init_app();
        onOpenRequest(handleFileOpen);
        onCloseRequest(handleClose);
        onLocationChange((sender, arg) => {
            window.location.href = arg;
        });
        onSaveRequest(handleFileSave);

        get_translations().then(res => {

            setInitialTranslation(res)
            i18n.changeLanguage('fr');
            ready();
        })

        onUpdateAvailable((sender, message) => {
            setUpdate(true);
            console.log(message)
            setUpdateMessage(message)
        })

        onDownloadProgress((sender,message)=>{
            setUpdate(false);
            setDownload(message);
        })


        onLanguageChange((sender, message) => {
            console.log('language changed')
            
            if (!i18n.hasResourceBundle(message.language, message.namespace)) {
                i18n.addResourceBundle(message.language, message.namespace, message.resource);
            }
            i18n.changeLanguage(message.language);
        })




    }, []);




    //silent save
    const handleSave = _ => {
        save_to_file();

    }

    return (
        <>
            <I18nextProvider i18n={i18n} initialI18nStore={initialI18nStore} initialLanguage="fr">
                <BIAManager dbname="default" handleSave={handleSave} />
                <Modal visible={update}>
                    <LayoutFlexColumn justCenter alignCenter>
                        <h2>Mise à jour disponible</h2>
                        <div dangerouslySetInnerHTML={{ __html: updateMessage.releaseNotes }}></div>
                        <LayoutFlex style={{ width: '100%' }} justBetween>
                            <Button onClick={_ => download_update()}>Installer</Button>
                            <Button onClick={_ => setUpdate(false)}>Fermer</Button>
                        </LayoutFlex>
                    </LayoutFlexColumn>
                </Modal>

                <Modal visible={download!==null}>
                    <LayoutFlexColumn justCenter alignCenter>
                        <h2>Téléchargement de la version {updateMessage.version}</h2>
                        {download && Math.round(download.percent)}%
                    </LayoutFlexColumn>
                </Modal>

               <ErrorHandler />

            </I18nextProvider>
        </>
    );

}




export default ConnectApp(Component);


