
const { contextBridge, ipcRenderer } = require('electron')
console.log('hello from preload')


contextBridge.exposeInMainWorld(
    'electron',
    {
      handleOpenFile: callback => ipcRenderer.on('file-open',callback),
      handleSaveRequest: callback => ipcRenderer.on('trigger-save',callback),
      save: (filename,data)=> ipcRenderer.invoke('file-save',filename,data)
    }
  )


