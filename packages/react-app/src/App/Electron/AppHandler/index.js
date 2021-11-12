import React, { useState, useEffect, useRef, useMemo } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import { I18nextProvider } from 'react-i18next';
import i18n, { setHandler } from '@/i18next.electron';

import { useElectron } from '@/Providers/ElectronProvider';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';

import Modal from '@/App/Components/Modal';
import ErrorHandler from '@/App/BIA/Features/ErrorMessageHandler'
import UpdateAvailable from '@/App/Electron/UpdateAvailable';
import DownloadUpdate from '@/App/Electron/DownloadUpdate';
//const api = makeAPI('electron')
import { Provider as ViewsProvider } from '@/Providers/ViewsProvider'


export const Component = props => {


    const { onOpenRequest, onSaveRequest, onLanguageChange, onLocationChange, onQuit,onCloseRequest, get_translations,onDownloadProgress, missing_translations,download_update, ready, onUpdateAvailable,onError,quit } = useElectron();
    const { open_file, save_to_file, start_loading, stop_loading, current_file, close, init_app,add_error } = props;
    const [initialI18nStore, setInitialTranslation] = useState({});

    const [update, setUpdate] = useState(false); // update system
    const [download, setDownload] = useState(null); // download system
    const [updateMessage, setUpdateMessage] = useState({});


    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file()
            .then(result => {
                debugger;
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(err=> {
                debugger;

                stop_loading();
                console.error(err)
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

        onQuit(_=> {
            close().then(_=>{
                quit();

            })
        })
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

        onError((sender,message)=>{
            add_error('Une erreur est survenue')
        });



    }, []);



    return (
        <>
            <I18nextProvider i18n={i18n} initialI18nStore={initialI18nStore} initialLanguage="fr">
                <ViewsProvider>
                    <BIAManager />
                </ViewsProvider>
                <Modal visible={update}>
                    <UpdateAvailable download={download_update} close={_=>setUpdate(false)}/>
                </Modal>

                <Modal visible={download!==null}>
                    <DownloadUpdate download={download} updateMessage={updateMessage}/>
                </Modal>
               <ErrorHandler />
            </I18nextProvider>
        </>
    );

}




export default ConnectApp(Component);


