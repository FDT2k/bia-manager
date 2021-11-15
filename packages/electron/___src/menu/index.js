
import {Menu } from 'electron';
import config from '../app.config';

import darwinTemplate from './menu.darwin';
import otherTemplate from './menu.other';

const menu = null

function MenuFactoryService(menu) {
  this.menu = menu;
  this.buildMenu = buildMenu;
}


function buildMenu(app, mainWindow,i18n) {
  if (config.platform === 'darwin') {
    this.menu = Menu.buildFromTemplate(darwinTemplate(app, mainWindow, i18n));
    Menu.setApplicationMenu(this.menu);
  } else {
    this.menu = Menu.buildFromTemplate(otherTemplate(app, mainWindow, i18n));
    mainWindow.setMenu(this.menu)
  }
}
export default  new MenuFactoryService(menu);