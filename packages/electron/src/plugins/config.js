import i18n from 'i18next'
import i18nextBackend   from 'i18next-node-fs-backend';

import {join,resolve} from 'path';
import {postMissingTranslations} from './missing';

const localePath = resolve(__dirname, '../locales');


export const defaultOptions = {
  languages: ['fr', 'en'],
  fallbackLng: 'fr',
  namespace: 'translation'
};

export const i18nextOptions = {
  backend:{
    // path where resources get loaded from
    loadPath: join(localePath,'/{{lng}}/{{ns}}.json'),

    // path to post missing resources
    //addPath: join(localePath,'/{{lng}}/{{ns}}.missing.json'),

    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  interpolation: {
    escapeValue: false
  },
  saveMissing: import.meta.env.MODE === "development",
  missingKeyHandler: (lngs,ns,key,fallback) => {
  //  debugger;
    //handler && handler(...args)
    postMissingTranslations({lngs,ns,key});
  },
  fallbackLng: defaultOptions.fallbackLng,
  whitelist: defaultOptions.languages,
  
};

i18n
  .use(i18nextBackend);

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .init(i18nextOptions);
}

export default i18n;