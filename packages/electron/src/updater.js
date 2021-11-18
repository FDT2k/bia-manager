/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
 import { dialog } from 'electron'
 import { autoUpdater }  from 'electron-updater'
 
 let updater
 let _window 
 autoUpdater.autoDownload = false
 
 autoUpdater.on('error', (error) => {
   dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
 })
 
 autoUpdater.on('update-available', (info) => {
    _window.send('update-available',info)
  
 })

 autoUpdater.on('download-progress',(info)=>{
    _window.send('download-progress',info)

 })
 
 autoUpdater.on('update-not-available', (info) => {
  _window.send('no-update-available',info)
   updater.enabled = true
 })
 
 autoUpdater.on('update-downloaded', () => {
   dialog.showMessageBox({
     title: 'Install Updates',
     message: 'Updates downloaded, application will be quit for update...'
   }).then(() => {
     setImmediate(() => autoUpdater.quitAndInstall())
   })
 })
 
 // export this to MenuItem click callback
 function checkForUpdates (menuItem, window, event) {
     _window = window;
   updater = menuItem
   updater.enabled = false
   autoUpdater.checkForUpdates()
 }
export default  {menu: checkForUpdates, autoUpdater}
 