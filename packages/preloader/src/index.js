import {camelize} from '@karsegard/composite-js'
const { contextBridge, ipcRenderer,app } = require('electron')
console.log('hello from preload',app)



const clientAddListener = channel => callback =>  ipcRenderer.on(channel,callback)
const clientRemoveListener = channel => callback => {
  console.log('removing ',channel,callback)
  ipcRenderer.removeListener(channel,callback)
};

const clientEvent = (key,channel) => ({
    [camelize(`revoke-${key}`)]: clientRemoveListener(channel),
    [camelize(`handle-${key}`)]: clientAddListener(channel),

})

const invokeOnMainProcess = channel => (...args) =>  ipcRenderer.invoke(channel,...args)


const electronAPI = {
  //handleOpenFile: clientAddListener('file-open'),
  ...clientEvent('saveRequest','trigger-save'),
  ...clientEvent('openRequest','trigger-open'),
  ...clientEvent('importRequest','trigger-import'),
  ...clientEvent('locationChange','location-change'),
  save:invokeOnMainProcess('file-save'),
  open:invokeOnMainProcess('file-open')
};

console.log(electronAPI)
contextBridge.exposeInMainWorld(
    'electron',
    electronAPI
  )


