import { useElectron } from '@/Context/Electron';
import i18n from 'i18next';
import React, { useEffect,useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';




let handler = null
export const setHandler = fn => {
    handler = fn
}


i18n
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: 'fr',
        debug: false,
        saveMissing: import.meta.env.MODE === "development",
        missingKeyHandler: (...args) => {
            handler && handler(...args)
        },
        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        // override if needed - omit if ok with defaults

        react: {
            useSuspense: true,
        }

    });


export default ({ children }) => {
    const [initialI18nStore, setInitialTranslation] = useState({});

    const {actions:{get_translations,missing_translations,i18next_ready},subscribers:{handleLanguageChange}} = useElectron();

    useEffect(() => {
        setHandler(missing_translations)

        get_translations().then(res => {
            setInitialTranslation(res)
            i18n.changeLanguage('fr');
            i18next_ready();
        })

        handleLanguageChange((sender, message) => {
            console.log('language changed')

            if (!i18n.hasResourceBundle(message.language, message.namespace)) {
                i18n.addResourceBundle(message.language, message.namespace, message.resource);
            }
            i18n.changeLanguage(message.language);
        })

    }, []);
    return (
        <I18nextProvider i18n={i18n} initialI18nStore={initialI18nStore} initialLanguage="fr">
            {children}
        </I18nextProvider>
    )
}