if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {

  "publish": [{
    "provider": "github",
    "owner": "fdt2k",
    "repo": "bia-manager"
  }],
  productName:"bia-manager",
  directories: {
    output: 'dist',
    buildResources: 'buildResources',

  },
  files: [
    'packages/**/dist/**',
    {
      from: 'packages/electron/locales',
      to: 'packages/electron/locales'
    },
    {
      from: 'packages/electron/migrations',
      to: 'packages/electron/migrations'
    },
    {
      from: 'packages/react-electron/public/fonts',
      to: 'packages/react-electron/dist/assets/fonts'
    }
  ],
  win: {
    target: ["nsis"],
    publish: [
      "github"
    ]
  },
  mac: {
    publish: [
      "github"
    ],
    category: "public.app-category.utilities"
  },
  linux: {
    target: ["AppImage"],
    category: "Utility",
    publish: [
      "github"
    ]
  },
  /* extraMetadata: {
     version: process.env.VITE_APP_VERSION,
   },*/
};

module.exports = config;
