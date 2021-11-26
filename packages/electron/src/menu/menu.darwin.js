import { identity } from "@karsegard/composite-js";
import updater from "../updater"


export default  (app, window, labelEnhancer=identity) => {
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
          window.webContents.send('location-change', '#/help');
        }
      }
    ]
  })


  return menu;
};