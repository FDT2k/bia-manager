import config from '../app.config';
import updater from "../updater"


export default  (app, window, i18n) => {
  let menu = [
    {
      label: i18n.t('BIAManager'),
      submenu: [
        {
          label: i18n.t('About BIAManager'),
          click(){
            window.webContents.send('location-change', '#/about');
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Hide App'),
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: i18n.t('Hide Others'),
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: i18n.t('Show All'),
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Quit'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: i18n.t('View'),
      submenu: [
        {
          label: i18n.t('Reload'),
          accelerator: 'Command+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: i18n.t('Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: i18n.t('Minimize'),
          accelerator: 'Command+M',
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
    ,
    {
      label: i18n.t('Outils'),
      submenu: [
        {
          label: i18n.t('Importer'),
          click() {
            window.webContents.send('location-change', '#/database');
          }
        },
        {
          label: i18n.t('Gestion des listes'),
          click() {
            window.webContents.send('location-change', '#/database/listes');
          }
        },
        {
          label: i18n.t('Recherche'),
          click() {
            window.webContents.send('location-change', '#/search');
          }

        },
      ]
    },
    
  ];
  const languageMenu = config.languages.map((languageCode) => {
      return {
        label: i18n.t(languageCode),
        type: 'radio',
        checked: i18n.language === languageCode,
        click: () => {
          i18n.changeLanguage(languageCode);
        }
      }
  });
  menu.push({
    label: i18n.t('Language'),
    submenu: languageMenu
  });

  menu.push( {
    label: i18n.t('Help'),
    submenu: [
      {
        label: i18n.t('check for updates'),
        click: updater.menu
      },
      {
        label: i18n.t('About App'),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
          }
        }
      }
    ]
  })


  if(import.meta.env.MODE === 'development'){
    menu.push({
      label: i18n.t('DEV'),
    submenu: [
      {
        label: i18n.t('simulate check for updates'),
        click: _=> window.webContents.send('update-available',{releaseNotes:"Testing autoupdate",version:"0.0.44"})
      },
      {
        label: i18n.t('Download progress'),
        click: _=> window.webContents.send('download-progress',{percent:8})
      },
    ]
    })
  }
  return menu;
};