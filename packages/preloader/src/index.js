import { camelize } from '@karsegard/composite-js'
import { expose, clientEvent, invokeOnMainProcess } from '@karsegard/electron-preloader';



let electronAPI = {
  events: {
    ...clientEvent('saveRequest', 'trigger-save'),
    ...clientEvent('openRequest', 'trigger-open'),
    ...clientEvent('importRequest', 'trigger-import'),
    ...clientEvent('closeRequest', 'trigger-close'),
    ...clientEvent('willQuit', 'app-quit'),
    ...clientEvent('locationChange', 'location-change'),
    ...clientEvent('error', 'error'),

    //updates
    ...clientEvent('updateAvailable', 'update-available'),
    ...clientEvent('updateNotAvailable', 'no-update-available'),
    ...clientEvent('downloadProgress', 'download-progress'),
    //translations
    ...clientEvent('languageChange', 'language-change'),
  },
  actions: {
    save: invokeOnMainProcess('file-save'),
    open: invokeOnMainProcess('file-open'),
    get_settings: invokeOnMainProcess('read-settings'),
    get_file_state: invokeOnMainProcess('get-file-state'),
    close: invokeOnMainProcess('close'),
    quit: invokeOnMainProcess('quit'),
    

    //updates
    download_update: invokeOnMainProcess('update'),

    /// translations
    get_translations: invokeOnMainProcess('get-translations'),
    missing_translations: invokeOnMainProcess('missing-translations'),
    i18next_ready: invokeOnMainProcess('i18next-client-ready'),

    //sqlite

    sqlite_open: invokeOnMainProcess('sqlite-open'),
    sqlite_unlock: invokeOnMainProcess('sqlite-unlock'),
    sqlite_query: invokeOnMainProcess('sqlite-query'),
    sqlite_import: invokeOnMainProcess('sqlite-import'),
    sqlite_search: invokeOnMainProcess('sqlite-search'),
    sqlite_custom_search: invokeOnMainProcess('sqlite-custom-search'),
    sqlite_create: invokeOnMainProcess('sqlite-create'),

  }
};

if (import.meta.env.MODE === 'development') {
  electronAPI.collect_translation = invokeOnMainProcess('collect-translation')
}
expose(
  'electron',
  electronAPI
)

expose(
  'isElectron',
  true
)
