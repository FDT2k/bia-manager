
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



function buildMenu(app, mainWindow, _labelEnhancer=identity, moreMenu,actions) {
  if (config.platform === 'darwin') {
    let labelEnhancer = key => {
      let _key = key+'//macos menu item';
      let r = _labelEnhancer(_key);
      if(r==_key){
        let a = key.split('//');
        return a[0];
      }
      return r;
    }
    this.menu = darwinTemplate(app, mainWindow, labelEnhancer,actions);
  } else {
    let labelEnhancer = key => {
      let _key = key+'//win or linux menu item';
      let r = _labelEnhancer(_key);
      if(r==_key){
        let a = key.split('//');
        return a[0];
      }
      return r;
    }
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