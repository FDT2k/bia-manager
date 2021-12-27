
import { Menu } from 'electron';
import config from '../app.config';

import darwinTemplate from './menu.darwin';
import otherTemplate from './menu.other';

const menu = []

function MenuFactoryService(menu) {
  this.menu = menu;
  this.buildMenu = buildMenu;
}


function buildMenu(app, mainWindow, labelEnhancer, moreMenu) {
  if (config.platform === 'darwin') {
    this.menu = darwinTemplate(app, mainWindow, labelEnhancer);
  } else {
    this.menu = otherTemplate(app, mainWindow, labelEnhancer);
  }
  if (moreMenu) {
    this.menu.push(moreMenu)
  }
  //if (config.platform === 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.menu));
  /*} else {
    mainWindow.setMenu(Menu.buildFromTemplate(this.menu))
  }*/
}
export default new MenuFactoryService(menu);