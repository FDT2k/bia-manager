import {camelize} from '@karsegard/composite-js'
const { contextBridge, ipcRenderer,app } = require('electron')
console.log('hello from preload',app)



const clientAddListener = channel => callback =>  ipcRenderer.on(channel, (...args) => {
  return  callback(...args)
});
const clientRemoveListener = channel => callback => {
  console.log('removing ',channel,callback)
  ipcRenderer.removeListener(channel,callback)
};

const clientEvent = (key,channel) => ({
    [camelize(`revoke-${key}`)]: clientRemoveListener(channel),
    [camelize(`handle-${key}`)]: clientAddListener(channel),

})

const invokeOnMainProcess = channel => (...args) =>  ipcRenderer.invoke(channel,...args)


let electronAPI = {
  //handleOpenFile: clientAddListener('file-open'),
  ...clientEvent('saveRequest','trigger-save'),
  ...clientEvent('openRequest','trigger-open'),
  ...clientEvent('importRequest','trigger-import'),
  ...clientEvent('closeRequest','trigger-close'),
  ...clientEvent('willQuit','app-quit'),
  ...clientEvent('locationChange','location-change'),
  ...clientEvent('languageChange','language-change'),
  ...clientEvent('updateAvailable','update-available'),
  ...clientEvent('downloadProgress','download-progress'),
  ...clientEvent('error','error'),
  save:invokeOnMainProcess('file-save'),
  open:invokeOnMainProcess('file-open'),
  sqlite_open:invokeOnMainProcess('sqlite-open'),
  get_settings:invokeOnMainProcess('read-settings'),
  current_filename:invokeOnMainProcess('current-filename'),
  clear_opened_filename:invokeOnMainProcess('clear-filename'),
  get_translations:invokeOnMainProcess('get-translations'),
  missing_translations:invokeOnMainProcess('missing-translations'),
  ready:invokeOnMainProcess('ready'),
  download_update:invokeOnMainProcess('update'),
  quit:invokeOnMainProcess('quit'),

};

if (import.meta.env.MODE === 'development') {
  electronAPI.collect_translation =invokeOnMainProcess('collect-translation')
}
console.log(electronAPI)
  contextBridge.exposeInMainWorld(
    'electron',
    electronAPI
  )

  contextBridge.exposeInMainWorld(
    'isElectron',
    true
  )
