
import { Menu } from 'electron';
import config from '../app.config';

import darwinTemplate from './menu.darwin';
import otherTemplate from './menu.other';
import { identity } from '@karsegard/composite-js';

const menu = []

function MenuFactoryService(menu) {
  this.menu = menu;
  this.buildMenu = buildMenu;
}

const makeLabelEnhancer = (comment,fn) => key => {
  let _key = key+comment;
  let r = fn(_key);
  if(r==_key){
    let a = key.split('//');
    return a[0];
  }
  return r;
}

function buildMenu(app, mainWindow, _labelEnhancer=identity, moreMenu,actions) {
  if (config.platform === 'darwin') {
    let labelEnhancer = makeLabelEnhancer('//macos menu item',_labelEnhancer);
    this.menu = darwinTemplate(app, mainWindow, labelEnhancer,actions);
  } else {
    let labelEnhancer = makeLabelEnhancer('//win or linux menu item',_labelEnhancer);
    this.menu = otherTemplate(app, mainWindow, labelEnhancer,actions);
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