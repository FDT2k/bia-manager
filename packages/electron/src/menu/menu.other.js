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
<<<<<<< HEAD
          label: labelEnhancer('Open'),
=======
          label: labelEnhancer('Ouvrir'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'open',
          click() {
            window.webContents.send('trigger-open');
          }
        },
       
        {
<<<<<<< HEAD
          label: labelEnhancer('Close'),
=======
          label: labelEnhancer('Fermer'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
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
        }
      ]
    },
    {
<<<<<<< HEAD
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
=======
      label: labelEnhancer('Sécurité'),
      submenu: [
        {
          label: labelEnhancer('Configurer'),
          id:'configure-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-configure-sensitive-data');
          }

        },
        {
          label: labelEnhancer('Déverouiller les données sensibles'),
          id:'unlock-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-unlock-sensitive-data');
          }

        },
        {
          label: labelEnhancer('Verrouiller les données sensibles'),
          id:'lock-sensitive-data',
          enabled:false,
          click() {
            window.webContents.send('trigger-lock-sensitive-data');
          }

        },
      ]
    },
    
    {
      label: labelEnhancer('Outils'),
      submenu: [
        {
          label: labelEnhancer('Importer'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'import',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
<<<<<<< HEAD
          label: labelEnhancer('Export'),
          id:'export',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/export');
          }
        },
        {
          label: labelEnhancer('Sync children databases'),
=======
          label: labelEnhancer('Synchroniser d\'autres bases'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'sync',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/sync');
          }
        },
        {
<<<<<<< HEAD
          label: labelEnhancer('Lists manager'),
=======
          label: labelEnhancer('Gestion des listes'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'list',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/database/listes');
          }
        },
        {
<<<<<<< HEAD
          label: labelEnhancer('Search'),
=======
          label: labelEnhancer('Recherche'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'search',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/search');
          }

        }
        
      ]
    },
    {
<<<<<<< HEAD
      label: labelEnhancer('Settings'),
      submenu: [
        {
          label: labelEnhancer('Insert custom header'),
=======
      label: labelEnhancer('Paramètres'),
      submenu: [
        {
          label: labelEnhancer('Inserer l\'entête personnalisée'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'customize-header',
          enabled:true,
          click() {
            window.webContents.send('trigger-custom-header');
          
          }

        },
        {
<<<<<<< HEAD
          label: labelEnhancer('Remove custom header'),
=======
          label: labelEnhancer('Retirer l\'entête personnalisée'),
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
          id:'customize-header',
          enabled:true,
          click() {
            actions.remove_custom_header().then(res=>{
              dialog.showMessageBox(window,{
<<<<<<< HEAD
                message:labelEnhancer('Header deleted')
=======
                message:labelEnhancer('Entête supprimé')
>>>>>>> 53928269942854a6eebd2ca827623e67f26262ec
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