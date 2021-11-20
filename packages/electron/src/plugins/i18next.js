import { app, ipcMain, BrowserWindow, Menu, dialog } from 'electron';
import { Mutex } from 'async-mutex';
import i18n, { i18nextOptions,defaultOptions } from './config';
import fs from 'fs/promises'

import {deep_merge} from '@karsegard/composite-js'
const mutex = new Mutex();


const buildMenu = ()=>{
    const languageMenu = defaultOptions.languages.map((languageCode) => {
        return {
          label: i18n.t(languageCode),
          type: 'radio',
          checked: i18n.language === languageCode,
          click: () => {
            i18n.changeLanguage(languageCode);
          }
        }
    });
    let menu={
      label: i18n.t('Language'),
      submenu: languageMenu
    };
    return menu;
}


export default  (handleLanguageChange,language='fr') => mainWindow=> {
    i18n.on('loaded', (loaded) => {
        i18n.changeLanguage(language);
        i18n.off('loaded');
    });

    i18n.on('languageChanged', (lng) => {
        console.log('changing language to ', lng)
        handleLanguageChange && handleLanguageChange(i18n,buildMenu())
        mainWindow.webContents.send('language-change', {
            language: lng,
            namespace: defaultOptions.namespace,
            resource: i18n.getResourceBundle(lng, defaultOptions.namespace)
        });
    });


    ipcMain.handle('i18next-client-ready', async _ => {
        console.log('client reported ready')
        i18n.changeLanguage(language);
    })

    if (import.meta.env.MODE === 'development') {
        ipcMain.handle('missing-translations', (event, lngs, ns, key, fallbackValue, updateMissing, options) => {
            mutex
                .acquire()
                .then(function (release) {

                    let p = i18nextOptions.backend.addPath.replace('{{ns}}', ns).replace('{{lng}}', lngs[0]);
                    return fs.readFile(p).then(res => {
                        return JSON.parse(res);
                    }).then(trans => {
                        return deep_merge(trans, { [key]: key });
                    }).then(res => {

                        return fs.writeFile(p, JSON.stringify(res, null, 3)).then(res => typeof result === 'undefined');
                    }).then(res => release());

                }).catch(res => console.error(res));


        })
    }
    ipcMain.handle('get-translations', (event, arg) => {
        return new Promise((resolve, reject) => {

            i18n.loadLanguages('en', (err, t) => {
                const initial = {
                    'fr': {
                        'translation': i18n.getResourceBundle('fr', defaultOptions.namespace)
                    }
                };
                resolve(initial);
            });
        })

    });

  
    return mainWindow
}