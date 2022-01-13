import { identity } from '@karsegard/composite-js';
import config from '../app.config';
import updater from "../updater"

export default (app, window,labelEnhancer=identity ) => {
  let menu = [
    {
      label: labelEnhancer('&File'),
      submenu: [
        {
          label: labelEnhancer('Ouvrir'),
          id:'open',
          click() {
            window.webContents.send('trigger-open');
          }
        },
       
        {
          label: labelEnhancer('Fermer'),
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
          id:'import',
          enabled:false,
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
          label: labelEnhancer('Synchroniser d\'autres bases'),
          id:'sync',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/sync');
          }
        },
        {
          label: labelEnhancer('Gestion des listes'),
          id:'list',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/database/listes');
          }
        },
        {
          label: labelEnhancer('Recherche'),
          id:'search',
          enabled:false,

          click() {
            window.webContents.send('location-change', '#/search');
          }

        },
        {
          label: labelEnhancer('Déverouiller les données sensibles'),
          id:'unlock-sensitive-data',
          click() {
            window.webContents.send('trigger-unlock-sensitive-data');
          }

        },
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