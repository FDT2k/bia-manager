if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
    
  },
  files: [
    'packages/**/dist/**',
  ],
  win:{
    target:["nsis"],
    publish: [
      "github"
    ]
  },
  mac:{
    publish: [
      "github"
    ],
    target: ["dmg"],
    category: "public.app-category.utilities"
  },
  linux:{
    target:["AppImage"],
    category: "Utility",
    publish: [
      "github"
    ]
  },
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
};

module.exports = config;
