/*
const path = require('path')
const glob = require('glob')
const { app,ipcMain, BrowserWindow, protocol, Menu } = require('electron')
const { dialog } = require('electron')
const isDev = require('electron-is-dev');
const debug = /--debug/.test(process.argv[2])



if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize() {
  makeSingleInstance()

  

  function createWindow() {
    const windowOptions = {
      width: 1280,
      minWidth: 1000,
      height: 840,
      title: app.name,
      webPreferences: {
        preload: path.join(__dirname, '../../preloader/dist/index.cjs'),
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
      }
    }

    if (process.platform === 'linux') {
      //    windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)

    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3333'
        : `file://${path.join(__dirname, '../index.html')}`
    );

    // Launch fullscreen with DevTools open, usage: npm run debug
    mainWindow.webContents.openDevTools()
    if (debug) {
    
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    var menu = Menu.buildFromTemplate([
      {
        label: 'Menu',
        submenu: [
          {
            label: 'Ouvrir',
            click() {
              dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then(res=>{
                console.log(res);
              })
            }
          },
          { 
            label: 'Enregistrer',
            click(){
              mainWindow.webContents.send('trigger-save');
            }
          },
          {
            label: 'Exit',
            click() {
              app.quit()
            }
          }
        ]
      }
    ])
    Menu.setApplicationMenu(menu);
  
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })


  app.whenReady().then(() => {
    protocol.interceptFileProtocol('file', (request, callback) => {
      console.log(request.url);
      if (request.url.indexOf('file:///workers') !== -1) {
        let filename = request.url.substr(8);

        let newPath = path.resolve(__dirname, '..', filename);
        console.log('worker', __dirname, filename, newPath)
        debugger;
        return callback({ path: path.resolve(__dirname, request.url.substr(8)) });
      }
      return callback(request);
    });

  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

ipcMain.handle('file-save',  (event, filename,data) => {
  console.lop('write file')
})
initialize()
*/
import { app, ipcMain, BrowserWindow, Menu, dialog } from 'electron';
import { join, resolve } from 'path';
import { URL } from 'url';
import fs from 'fs/promises';
import { is_nil, deep_merge } from '@karsegard/composite-js';

//import createAPI from './BIADatabase';

//const Database = require('better-sqlite3');


/*console.log(resolve('./test.sqlite'));
const API = createAPI(Database,resolve('./test.sqlite'))
*/
let openedFilePath;

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
const createFileIfNeeded = (file, content) => fs.stat(file).catch(_ => {
  fs.writeFile(file, content, { encoding: 'utf8' })
});


const settingsFile = (import.meta.env.MODE === 'development') ? join(__dirname, '../.bim-settings.json') : join(app.getPath('home'), '.bim-settings.json')

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

const createMenu = window => {
  var menu = Menu.buildFromTemplate([

    {
      label: 'Menu',
      submenu: [
        {
          label: 'Ouvrir',
          click() {
            window.webContents.send('trigger-open');
          }
        },
        {
          label: 'Enregistrer',
          click() {
            window.webContents.send('trigger-save');
          },
          //enabled: !is_nil(openedFilePath)&& openedFilePath!="" 
        },
        {
          label: 'Fermer',
          click() {
            window.webContents.send('trigger-close');
          },
        },
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        }
      ]
    }, {
      label: 'Debug',
      submenu: [
        {
          label: 'Import',
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
          label: 'Base',
          click() {
            window.webContents.send('location-change', '#/search');
          }
        },
        {
          label: 'DevTools',
          click() {
            window.webContents.openDevTools()
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);
}

const setupAutoUpdate = _ => {
  if (import.meta.env.PROD) {

    return import('electron-updater')
      .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
      .catch((e) => console.error('Failed check updates:', e));
  }
  return false;
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

/*
app.on('before-quit', () => {
  ipcMain.removeAllListeners();
  mainWindow.removeAllListeners('close');
});



app.on('will-quit', () => {
  //if (process.platform !== 'darwin') {
  ipcMain.removeAllListeners();
  mainWindow.removeAllListeners();
  app.quit();
  app.exit();
  console.log('quitting app')
  // }
});
app.on('window-all-closed', () => {
  //if (process.platform !== 'darwin') {
  ipcMain.removeAllListeners();
  mainWindow.removeAllListeners();
  app.quit();
  app.exit();
  process.exit(0);
  console.log('exiting app')
  // }
});*/


app.on('window-all-closed', () => {
 // if (process.platform !== 'darwin') {
 //   console.log('quit app')
 // }
 app.quit();
});

app.whenReady()
  .then(createWindow)
  .then(window => {
    createMenu(window);
    loadContent(window);
  })
  .catch((e) => console.error('Failed create window:', e));

