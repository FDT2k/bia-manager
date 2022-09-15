import { identity } from "@karsegard/composite-js";
import updater from "../updater"
import {  BrowserWindow,dialog } from 'electron';


export default  (app, window, labelEnhancer=identity,actions) => {
  let menu = [
    {
      label: labelEnhancer('BIAManager'),
      submenu: [
        {
          label: labelEnhancer('About BIAManager'),
          click(){
            window.webContents.send('location-change', '#/about');
          }
        },
        {
          type: 'separator'
        },
        {
          label: labelEnhancer('Hide App'),
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: labelEnhancer('Hide Others'),
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: labelEnhancer('Show All'),
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: labelEnhancer('Quit'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: labelEnhancer('&File'),
      submenu: [
        {
          label: labelEnhancer('Open'),
          id:'open',

          click() {
            window.webContents.send('trigger-open');
          }
        },
       
        {
          label: labelEnhancer('Close'),
          id:'close',
          enabled:false,
          click() {
            window.webContents.send('trigger-close');
          },
        },
       
      ]
    },
    {
      label: labelEnhancer('View'),
      submenu: [
        {
          label: labelEnhancer('Reload'),
          accelerator: 'Command+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: labelEnhancer('Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: labelEnhancer('Minimize'),
          accelerator: 'Command+M',
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          label: labelEnhancer('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
    
    ,
    {
      label: labelEnhancer('Security'),
      submenu: [
        {
          label: labelEnhancer('Configure'),
          id:'configure-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-configure-sensitive-data');
          }

        },
        {
          label: labelEnhancer('Unlock sensitive data'),
          id:'unlock-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-unlock-sensitive-data');
          }

        },
        {
          label: labelEnhancer('Lock sensitive data'),
          id:'lock-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-lock-sensitive-data');
          }

        },
      ]
    },
    {
      label: labelEnhancer('Tools'),
      submenu: [
        {
          label: labelEnhancer('Import'),
          id:'import',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
          label: labelEnhancer('Export'),
          id:'export',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/export');
          }
        },
        {
          label: labelEnhancer('Sync children databases'),
          id:'sync',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/sync');
          }
        },
        {
          label: labelEnhancer('Lists manager'),
          id:'list',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/database/listes');
          }
        },
        {
          label: labelEnhancer('Search'),
          id:'search',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/search');
          }

        }
      ]
    },
    {
      label: labelEnhancer('Settings'),
      submenu: [
        {
          label: labelEnhancer('Insert custom header'),
          id:'customize-header',
          enabled:true,
          click() {
            window.webContents.send('trigger-custom-header');
          }

        },
        {
          label: labelEnhancer('Remove custom header'),
          id:'customize-header',
          enabled:true,
          click() {
            actions.remove_custom_header().then(res=>{
              dialog.showMessageBox(window,{
                message:labelEnhancer('Header deleted')
              })
            }).catch(err=>{
              dialog.showMessageBox(window,{
                message:err.message
              })
            });
            
          }

        }
      ]
    },
  ];
 

  menu.push( {
    label: labelEnhancer('Help'),
    submenu: [
      {
        label: labelEnhancer('check for updates'),
        click: updater.menu
      },
      {
        label: labelEnhancer('About App'),
        click() {
          window.webContents.send('location-change', '#/about');
        }
      }
    ]
  })


  return menu;
};