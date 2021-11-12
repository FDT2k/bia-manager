import {camelize} from '@karsegard/composite-js'
import {expose,clientEvent,invokeOnMainProcess} from '@karsegard/electron-preloader';



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
  expose(
    'electron',
    electronAPI
  )

  expose(
    'isElectron',
    true
  )
