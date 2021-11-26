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
          click() {
            window.webContents.send('trigger-open');
          }
        },
       
        {
          label: labelEnhancer('Fermer'),
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
      label: labelEnhancer('Outils'),
      submenu: [
        {
          label: labelEnhancer('Importer'),
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
          label: labelEnhancer('Gestion des listes'),
          click() {
            window.webContents.send('location-change', '#/database/listes');
          }
        },
        {
          label: labelEnhancer('Recherche'),
          click() {
            window.webContents.send('location-change', '#/search');
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