const { join, resolve, dirname } = require('path');
import reactRefresh from '@vitejs/plugin-react-refresh';
const { chrome } = require('../../electron-vendors.config.json');
import fs from 'fs/promises';
import pkg from './package.json';
import mainpkg from '../../package.json';

const PACKAGE_ROOT = __dirname;

console.log('ALIAS', resolve(PACKAGE_ROOT, 'src'))
console.log ( dirname(require.resolve('@karsegard/react-bia-manager/package.json')))
module.exports = {
  base: '',
  define: {
    "process.env.RENDERER_VERSION": `"${pkg.version}"`,
    "process.env.ELECTRON_VERSION": `"${mainpkg.version}"`
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    link: ['@karsegard/react-bia-manager'],
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },

      ],
    },
  },
 
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@': resolve(PACKAGE_ROOT, './src') + '/',
      //'@karsegard/react-bia-manager': '/@linked/@karsegard/react-bia-manager/index.js',
     // '/@linked/@karsegard/react-bia-manager/': resolve(dirname(require.resolve('@karsegard/react-bia-manager/package.json')),'../src')
    },
  },
  plugins: [reactRefresh()],
  build: {
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: './assets',
    rollupOptions: {
      //   external: require('../../externals').default,
    },
    emptyOutDir: true,
  },

};