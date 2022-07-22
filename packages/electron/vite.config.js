import {node} from '../../electron-vendors.config.json';
import {join} from 'path';
import {builtinModules} from 'module';
import pkg from '../../package.json';

const PACKAGE_ROOT = __dirname;


/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
console.log('CWD',process.cwd());
const config = {
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    lib: {
      entry: 'src/index.js',
      formats: ['cjs'],
    },
    commonjsOptions: {
      dynamicRequireTargets: [
        'better_sqlite3'
      ]
    },
    rollupOptions: {
     
      external: [
        'electron',
        'electron-updater',
        'electron-devtools-installer',
        ...builtinModules,
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
};

export default config;
