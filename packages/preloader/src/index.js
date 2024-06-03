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
    ...clientEvent('unlockSensitiveData','trigger-unlock-sensitive-data'),
    ...clientEvent('lockSensitiveData','trigger-lock-sensitive-data'),
    ...clientEvent('changeDatabasePassword','trigger-change-database-password'),
    ...clientEvent('customHeader','trigger-custom-header'),
    ...clientEvent('recomputeHash','trigger-recompute-hash'),
  },
  actions: {
    save: invokeOnMainProcess('file-save'),
    open: invokeOnMainProcess('file-open'),
    get_settings: invokeOnMainProcess('read-settings'),
    get_file_state: invokeOnMainProcess('get-file-state'),
    close: invokeOnMainProcess('close'),
    open_url: invokeOnMainProcess('open-url'),
    quit: invokeOnMainProcess('quit'),
    set_custom_header: invokeOnMainProcess('set_custom_header'),
    get_custom_header: invokeOnMainProcess('get_custom_header'),
    remove_custom_header: invokeOnMainProcess('remove_custom_header'),
    

    //updates
    download_update: invokeOnMainProcess('update'),

    /// translations
    get_translations: invokeOnMainProcess('get-translations'),
    missing_translations: invokeOnMainProcess('missing-translations'),
    i18next_ready: invokeOnMainProcess('i18next-client-ready'),

    //sqlite

    sqlite_open: invokeOnMainProcess('sqlite-open'),
    sqlite_api: invokeOnMainProcess('sqlite-api'),
    sqlite_model: invokeOnMainProcess('sqlite-model'),
    sqlite_unlock: invokeOnMainProcess('sqlite-unlock'),
    sqlite_unlock_sd: invokeOnMainProcess('sqlite-unlock-sd'),
    sqlite_lock_sd: invokeOnMainProcess('sqlite-lock-sd'),
    sqlite_sd_req_password: invokeOnMainProcess('sqlite-sd-req-pwd'),
    sqlite_sd_is_unlocked: invokeOnMainProcess('sqlite-sd-unlocked'),
    sqlite_query: invokeOnMainProcess('sqlite-query'),
    sqlite_import: invokeOnMainProcess('sqlite-import'),
    sqlite_search: invokeOnMainProcess('sqlite-search'),
    sqlite_custom_search: invokeOnMainProcess('sqlite-custom-search'),
    sqlite_create: invokeOnMainProcess('sqlite-create'),
    sqlite_rekey: invokeOnMainProcess('sqlite-change-key'),
    sqlite_model_transaction: invokeOnMainProcess('sqlite-model-transaction'),
    sqlite_export: invokeOnMainProcess('sqlite-export'),
    sqlite_attach: invokeOnMainProcess('sqlite-attach'),
    
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
