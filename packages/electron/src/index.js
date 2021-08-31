
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
        preload: __dirname + '/preload.js',
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
