import { app, ipcMain, BrowserWindow, Menu, dialog } from 'electron';

import { join, resolve } from 'path';
import { URL } from 'url';
import fs from 'fs/promises';
import { is_empty, is_nil } from '@karsegard/composite-js';

import menuFactoryService from './menu';

import updater from "./updater"
import openDB, { createdb } from './db'

import fileContext, { determine_file_type } from './fileContext';

import Store from 'electron-store'

let store = new Store();

import init18next from './plugins/i18next'
import { exit } from 'process';

let openedFilePath;
let currentSQLite;
let currentBackend;
let mainWindow = null;

let cleanState = false;

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}


const createFileIfNeeded = (file, content) => fs.stat(file).catch(_ => {
  fs.writeFile(file, content, { encoding: 'utf8' })
});


const langCollectionFile = resolve(__dirname, '../.langs');

/*

let searchtest ={

  sex: {
    options: {
      F: false,
      M: true
    },
    type: 'bools',
    key: 'gender'
  },
  birthday_range: {
    from: '1982-02-01',
    to: '1982-04-01',
    type: 'date_range',
    key: 'birthdate'
  }
}

let DB = openDB('/home/fabien/Downloads/BIM98/bia-database-98-escalade.sqlite', '-',{ fileMustExist: true})

*/
//DB.migrate();
/*let res = DB.subject.export_csv(searchtest,";")
console.log(res);
exit();*/
//console.log ('db check', DB.schema_check());
/*
DB.subject.custom_search(
  {
    mesure_range: {
      "from": "2021-11-01",
      "to": "2021-11-30",
      "type": "date_range",
      "key": "mesures_dates"
    },
    mesure_range: {
      "from": "2021-11-01",
      "to": "2021-11-30",
      "type": "date_range",
      "key": "birthdate"
    }
  })
*/
/*
console.log(DB.api.genInsertSQL('subjects', { id: 1, firstname: '12' }));
console.log(DB.api.genUpdateSQL('subjects', { firstname: '12' }, { id: 1 }));
DB.api.addSubject({
  firstname: 'hello',
  lastname: 'world'
})
const getSettings = _ => fs.readFile(settingsFile, { encoding: 'utf8' }).then(res => JSON.parse(res));
*/
/*DB.subject.import()([
  {firstname:'hello',lastname:'test',birthdate:'',gender:'M',uuid:'aaa',mesures:[]}
])
*/

app.disableHardwareAcceleration();

// Install "React.js devtools"
if (import.meta.env.MODE === 'development') {
  createFileIfNeeded(langCollectionFile, '{}');

  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS }) => {
      installExtension(REACT_DEVELOPER_TOOLS)
    })
    .catch(e => console.error('Failed install extension:', e));
}




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




  return mainWindow
};

const initMenu = async (window) => {
  menuFactoryService.buildMenu(app, window);


  return window
}

const loadContent = async mainWindow => {
  /**
    * URL for main window.
    * Vite dev server for development.
    * `file://../renderer/index.html` for production and test
    */
  const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../react-electron/dist/index.html', 'file://' + __dirname).toString();


  mainWindow.loadURL(pageUrl);
  return mainWindow
}

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


const openFile = async (filename) => {
  let additionalprops = {};

  openedFilePath = filename;
  const type = await determine_file_type(openedFilePath);
  let content = null

  currentBackend = type;
  if (type === 'json') {
    content = await fs.readFile(filename, { encoding: 'utf8' });
  } else if (type === 'sqlite') {
    currentSQLite = openDB(openedFilePath)
    additionalprops.unlocked = currentSQLite.isUnlocked();
  }
  return {
    canceled: false,
    type,
    content,
    ...additionalprops,
    file: filename,

  }
}


ipcMain.handle('file-open', async (event, filename) => {

  console.log('want to open file', filename);
  let { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: filename });

  if (!canceled) {
    cleanState = false;
    console.log('reading');

    return await openFile(filePaths[0])
  }

  return { canceled: true };
});

ipcMain.handle('read-settings', async (event,) => {

});
ipcMain.handle('get-file-state', async (event,) => {
  console.log('requested file state')
  let additionalprops = {};
  if (currentBackend == 'sqlite') {
    additionalprops.unlocked = currentSQLite.isUnlocked();
  }
  return { file: openedFilePath, type: currentBackend, canceled: false, ...additionalprops };
});
/*
ipcMain.handle('current-filename', async (event,) => {
  console.log('requested last opened filename')
  return { file: openedFilePath, backend: currentBackend };
});

ipcMain.handle('clear-filename', async (event,) => {
  console.log('cleared filename')
  openedFilePath = "";
  return true
});
*/
ipcMain.handle('save-settings', async (event, content) => {

});


ipcMain.handle('quit', async event => {
  console.log('client trigerred quit')
  cleanState = true;
  app.quit();
})



ipcMain.handle('open-url', async (event, message) => {
  return require('electron').shell.openExternal(message);
})

ipcMain.handle('close', async (event) => {
  console.log('closing file')
  try {
    if (!is_nil(currentSQLite)) {
      openedFilePath = null;
      currentSQLite.db.close()
      currentSQLite = null;
    } else if (openedFilePath) {
      openedFilePath = null;
    }
    currentBackend = null
    return true;
  } catch (e) {
    return Promise.reject(e);
  }

})

//should not be used anymore
ipcMain.handle('sqlite-open', async (event, { filename, key }) => {
  try {
    console.log('want to sqlite db', filename, key);
    currentSQLite = openDB(filename)
    return true;
  } catch (e) {
    return Promise.reject(e);
  }

})
ipcMain.handle('sqlite-unlock', async (event, key) => {
  try {
    console.log('unlocking sqlite db', key);
    return currentSQLite.unlock(key);
  } catch (e) {
    return Promise.reject(e);
  }

})



ipcMain.handle('sqlite-query', async (event, { type, table, query, values, filter, fn = 'all' }) => {
  try {
    if (type === 'geninsert') {
      query = currentSQLite.genInsertSQL(table, values)
    } else if (type === 'genupdate') {
      query = currentSQLite.genUpdateSQL(table, values, filter)
    }
    console.log('prepare query ', query, fn, values)
    return currentSQLite.db.prepare(query)[fn](values);
  } catch (e) {
    return Promise.reject(e);
  }

})

ipcMain.handle('sqlite-api', async (event, { api, args }) => {
  try {

    return currentSQLite[api](...args);
  } catch (e) {
    return Promise.reject(e);
  }

})

ipcMain.handle('sqlite-model', async (event, { model, fn, args }) => {
  try {
    console.log(model, fn, args)
    return currentSQLite[model][fn](...args);
  } catch (e) {
    return Promise.reject(e);
  }

})

ipcMain.handle('sqlite-model-transaction', async (event, { model, fn, args, arg_stmt = {} }) => {
  try {

    return currentSQLite[model][fn](...args)(arg_stmt);
  } catch (e) {
    return Promise.reject(e);
  }

})


ipcMain.handle('sqlite-export', async (event, { query, filename }) => {
  try {
    console.log('want to write file', filename);

    let { canceled, filePath } = await dialog.showSaveDialog({ defaultPath: filename });
    if (!canceled) {
      let result = currentSQLite.subject.export_csv(query).join('\n');

      return fs.writeFile(filePath, result).then(res => {
        return true;
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
  return false;
});


ipcMain.handle('sqlite-search', async (event, tag) => {
  try {
    return currentSQLite.subject.search(tag)
  } catch (e) {
    return Promise.reject(e);
  }

})


ipcMain.handle('sqlite-custom-search', async (event, arg) => {
  try {
    return currentSQLite.subject.custom_search(arg)
  } catch (e) {
    return Promise.reject(e);
  }

})

ipcMain.handle('sqlite-import', async (event, { model, data }) => {
  try {
    console.log(model, data)
    if (!is_nil(currentSQLite)) {
      let res = currentSQLite[model].import().immediate(data);
      console.log(res);
    } else {
      throw new Error('No database connected')
    }
  } catch (e) {
    return Promise.reject(e)
  }
})


ipcMain.handle('sqlite-create', async (event, { filename, key }) => {
  console.log('want to create sqlite file');

  let { canceled, filePath } = await dialog.showSaveDialog({ defaultPath: filename });
  if (!canceled) {
    console.log('saving', filePath, key);
    createdb(filePath, key);
    return await openFile(filePath);
  }

  return false;
})

ipcMain.handle('update', () => {
  updater.autoUpdater.downloadUpdate();
})

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  app.quit();
});

app.on('before-quit', e => {
  console.log('app will quit', cleanState);
  if (currentSQLite && currentSQLite.db) {
    currentSQLite.db.close()
  }
  if (!app.commandLine.hasSwitch('allow-dirty-quit') && !cleanState) {
    console.log('quitting prevented because app is not cleaned up')
    mainWindow.webContents.send('app-quit')
    e.preventDefault()
  }
})
const handleLanguageChange = (i18n, menu) => {
  menuFactoryService.buildMenu(app, mainWindow, i18n.t.bind(i18n), menu)
  store.set('language', i18n.language)
}
app.whenReady()
  .then(createWindow)
  .then(initMenu)
  .then(init18next(handleLanguageChange, store.get('language')))
  .then(loadContent)
  .catch((e) => console.error('Failed create window:', e));

app.on('uncaughtException', function (error) {
  // Handle the error
  console.error(error)
});