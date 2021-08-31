import {camelize} from '@karsegard/composite-js'
const { contextBridge, ipcRenderer } = require('electron')
console.log('hello from preload')


const clientAddListener = channel => callback =>  ipcRenderer.on(channel,callback)
const clientRemoveListener = channel => callback => ipcRenderer.removeListener(channel,callback);

const clientEvent = (key,channel) => ({
    [`revoke${camelize(key)}`]: clientRemoveListener(channel),
    [`handle${camelize(key)}`]: clientAddListener(channel),

})

const invokeOnMainProcess = channel => (...args) =>  ipcRenderer.invoke(channel,...args)

contextBridge.exposeInMainWorld(
    'electron',
    {
      handleOpenFile: clientAddListener('file-open'),
      handleSaveRequest: clientAddListener('trigger-save'),
      handleLocationChange :clientAddListener('location-change') ,
      save:invokeOnMainProcess('file-save')
    }
  )


