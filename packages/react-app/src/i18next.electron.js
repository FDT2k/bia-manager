import i18n  from 'i18next';

import { initReactI18next } from 'react-i18next';


let handler = null
export const setHandler = fn => {
    handler = fn
}


 i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'fr',
    debug: true,
    saveMissing:import.meta.env.MODE ==="development",
    missingKeyHandler: (...args)=> {
        handler && handler(...args)
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    
    react: {
      useSuspense: false,
    }
    
  });


export default i18n;