const { join,resolve } = require('path');

import fs from 'fs/promises';

const PACKAGE_ROOT = __dirname;

console.log ( 'ALIAS',resolve(PACKAGE_ROOT, 'src'))

module.exports = {
 
 
 
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@': resolve(PACKAGE_ROOT, './src') + '/',
    },
  },
  build:{
    minify:false,
    outDir: 'dist',
    target:'chrome95',
    assetsDir: './assets',
    lib: {
      entry: resolve(PACKAGE_ROOT, '/src/theme.js'),
      name: 'BIATheme',
    
    },
   
   
  }

};