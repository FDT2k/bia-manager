import { app, ipcMain, BrowserWindow, Menu, dialog } from 'electron';

import { join, resolve } from 'path';
import { URL } from 'url';
import fs from 'fs/promises';
import { is_nil, deep_merge } from '@karsegard/composite-js';
import { Mutex } from 'async-mutex';

import menuFactoryService from './menu';

import i18n, { i18nextOptions } from './i18next.config';
import config from './app.config';
import updater from "./updater"
import openDB from './sqlcipher'


const mutex = new Mutex();
let openedFilePath;

let openedSQLiteDB;

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}


const createFileIfNeeded = (file, content) => fs.stat(file).catch(_ => {
  fs.writeFile(file, content, { encoding: 'utf8' })
});


const settingsFile = (import.meta.env.MODE === 'development') ? join(__dirname, '../bim-settings.json') : join(app.getPath('home'), 'bim-settings.json')

const langCollectionFile = resolve(__dirname, '../.langs');
createFileIfNeeded(settingsFile, '{"lang":"fr"}');




const getSettings = _ => fs.readFile(settingsFile, { encoding: 'utf8' }).then(res => JSON.parse(res));



app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
  createFileIfNeeded(langCollectionFile, '{}');

  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS }) => {
      installExtension(REACT_DEVELOPER_TOOLS)
    })
    .catch(e => console.error('Failed install extension:', e));
}

let mainWindow = null;



const createWindow = async () => {



  mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 1000,
    height: 840,
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      preload: join(__dirname, '../../preloader/dist/index.cjs'),
      contextIsolation: import.meta.env.MODE !== 'test',   // Spectron tests can't work with contextIsolation: true
      enableRemoteModule: import.meta.env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
    if (import.meta.env.MODE === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  menuFactoryService.buildMenu(app, mainWindow, i18n);
  i18n.on('loaded', (loaded) => {
    i18n.changeLanguage('fr');
    i18n.off('loaded');
  });

  i18n.on('languageChanged', (lng) => {
    console.log('changing language to ' ,lng)
    menuFactoryService.buildMenu(app, mainWindow, i18n);
    mainWindow.webContents.send('language-change', {
      language: lng,
      namespace: config.namespace,
      resource: i18n.getResourceBundle(lng, config.namespace)
    });
  });

  return mainWindow
};

const loadContent = mainWindow => {
  /**
    * URL for main window.
    * Vite dev server for development.
    * `file://../renderer/index.html` for production and test
    */
  const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../react-app/dist/index.html', 'file://' + __dirname).toString();


  return mainWindow.loadURL(pageUrl);
}


const setupAutoUpdate = _ => {
  if (import.meta.env.PROD) {

    return import('electron-updater')
      .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
      .catch((e) => console.error('Failed check updates:', e));
  }
  return false;
}

ipcMain.handle('ready',async _=> {
  console.log('client reported ready')
  i18n.changeLanguage('fr');
})

ipcMain.handle('file-save', async (event, content, filename = '') => {

  console.log('want to write file', content.length, filename);
  let shouldAskForName = is_nil(openedFilePath) || openedFilePath == ""
  if (shouldAskForName) {
    let { canceled, filePath } = await dialog.showSaveDialog({ defaultPath: filename });
    if (!canceled) {
      console.log('saving');
      return fs.writeFile(filePath, content).then(res => {
        openedFilePath = filePath;
        return {
          result: (typeof result === 'undefined'),
          file: filePath
        }
      });
    }
  } else {
    console.log(`saving to ${openedFilePath}`)
    return fs.writeFile(openedFilePath, content).then(res => ({
      result: (typeof result === 'undefined'),
      file: openedFilePath
    }));
  }
  return false;
});

ipcMain.handle('update', ()=>{
  updater.autoUpdater.downloadUpdate();
})

ipcMain.handle('file-open', async (event, filename) => {

  console.log('want to open file', filename);
  let { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: filename });

  if (!canceled) {
    console.log('reading');
    openedFilePath = filePaths[0];
    let content = await fs.readFile(filePaths[0], { encoding: 'utf8' });

    return {
      canceled: false,
      content,
      file: filePaths[0],

    }
  }

  return { canceled: true };
});

ipcMain.handle('sqlite-open', async(event,filename,key)=>{
  console.log('want to sqlite db', filename,key);
  let { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: filename });

  if (!canceled) {
    console.log('reading');
    openedSQLiteDB =  openDB(filePaths[0],key);

    return {
      canceled: false,
      content,
      file: filePaths[0],

    }
  }

  return { canceled: true };
})

ipcMain.handle('read-settings', async (event,) => {
  return getSettings();
});


ipcMain.handle('current-filename', async (event,) => {
  console.log('requested last opened filename')
  return openedFilePath;
});

ipcMain.handle('clear-filename', async (event,) => {
  console.log('cleared filename')
  openedFilePath = "";
  return true
});

ipcMain.handle('save-settings', async (event, content) => {
  let filecontent = JSON.stringify(content);
  return fs.writeFile(settingsFile, filecontent).then(res => typeof result === 'undefined');
});

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
          'translation': i18n.getResourceBundle('fr', config.namespace)
        }
      };
      resolve(initial);
    });
  })

});

if (import.meta.env.MODE === 'development') {

  ipcMain.handle('collect-translation', async (event, content) => {
    console.log('translation collecting', content)

    return fs.readFile(langCollectionFile).then(res => {
      return JSON.parse(res);
    }).then(trans => {
      return deep_merge(trans, content);
    }).then(res => {
      return fs.writeFile(langCollectionFile, JSON.stringify(res)).then(res => typeof result === 'undefined');
    });

  });


}

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   console.log('quit app')
  // }
  app.quit();
});

app.whenReady()
  .then(createWindow)
  .then(window => {
    console.log(process.env)
    loadContent(window);
  })
  .catch((e) => console.error('Failed create window:', e));

