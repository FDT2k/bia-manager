/**
 By default, vite optimizes and packs all the necessary dependencies into your bundle,
 so there is no need to supply them in your application as a node module.
 Unfortunately, vite cannot optimize any dependencies:
 Some that are designed for a node environment may not work correctly after optimization.
 Therefore, such dependencies should be marked as "external":
 they will not be optimized, will not be included in your bundle, and will be delivered as a separate node module.
*/
module.exports.external = [
    'electron',
    'electron-updater',
  ];
  module.exports.react = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    '@reduxjs/toolkit',
    'reselect',
    'redux-persist',
    'react-is',
    'redux-persist/integration/react',
    'redux-persist/lib/storage',
    'redux-logger','redux-thunk',
    'react-table'
  ];
  module.exports.kda = [
    '@karsegard/react-core-layout',
    '@karsegard/react-redux',
    '@karsegard/react-hooks',
    '@karsegard/bia-manager-theme'
  ];
  
  
  module.exports.builtins = [
    'bluebird',
    'assert',
    'async_hooks',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'http2',
    'https',
    'inspector',
    'module',
    'net',
    'os',
    'path',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'timers',
    'tls',
    'trace_events',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'zlib',
    
  ];
  
  module.exports.default = [
    ...module.exports.builtins,
    ...module.exports.external,
    ...module.exports.react,
    ...module.exports.kda
  ];
  