import { identity } from '@karsegard/composite-js';
import config from '../app.config';
import updater from "../updater"
import {  BrowserWindow,dialog } from 'electron';
export default (app, window,labelEnhancer=identity,actions ) => {
  let menu = [
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
       
        {
          label: labelEnhancer('&Quit'),
          accelerator: 'Ctrl+Q',
          click: function () {
            app.quit();
          }
        }
      ]
    },
    {
      label: labelEnhancer('View'),
      submenu: [
        {
          label: labelEnhancer('Reload'),
          accelerator: 'Command+R',
          click: function (item, focusedWindow) {
            focusedWindow.reload();
          }
        },
      
        {
          type: 'separator'
        },
        {
          label: labelEnhancer('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: function (item, focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        },
       
      ]
    },
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
        {
          label: labelEnhancer('Change database password'),
          id:'change-database-password',
          enabled:false,
          click() {
            window.webContents.send('trigger-change-database-password');
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

        },
        {
          label: labelEnhancer('Refresh records hashes'),
          click: function (item, focusedWindow) {
            window.webContents.send('trigger-recompute-hash');
          }
        }
      ]
    },
  ];
  
  menu.push( {
    label: labelEnhancer('Help'),
    submenu: [
      {
        label: labelEnhancer('Check for updates'),
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