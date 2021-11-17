const { join,resolve } = require('path');

import fs from 'fs/promises';
import pkg from './package.json';

const PACKAGE_ROOT = __dirname;

console.log ( 'ALIAS',resolve(PACKAGE_ROOT, 'src'))

module.exports = {
  base: '',
  define: {
    "process.env.RENDERER_VERSION": `"${pkg.version}"`,
  },
  target:'web',
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
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
    },
  },
  build:{
    lib: {
      entry: resolve(PACKAGE_ROOT, 'src/index.js'),
      name: 'ReactCrud',
      formats:['es','umd','cjs'],
      fileName: (format) => `kda-react-crud.${format}.js`
    },
    rollupOptions: {
      external: require('./externals').default,
    },
  }
};