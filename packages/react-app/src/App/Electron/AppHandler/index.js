import React, { useState, useEffect,useRef, useMemo } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import { I18nextProvider } from 'react-i18next';
import i18n,{setHandler} from '@/i18next.electron';

import { useElectron } from '@/Providers/ElectronProvider';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';



//const api = makeAPI('electron')


export const Component = props => {

 
    const { onOpenRequest, onSaveRequest, onLanguageChange, onLocationChange, onCloseRequest, get_translations,missing_translations } = useElectron();
    const { open_file, save_to_file, start_loading, stop_loading, current_file, close, init_app } = props;

    const [initialI18nStore, setInitialTranslation] = useState({});

    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file()
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(console.error);

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
        )

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
        })

        onLanguageChange((sender, message) => {
            debugger;

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
            </I18nextProvider>
        </>
    );

}




export default ConnectApp(Component);


