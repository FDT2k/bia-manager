import React from 'react';

import { BIARouter, ViewProvider, TranslationProvider,CustomListProvider } from '@'


import Search,{Page} from '@/Features/Search';
import { useTranslation } from '@';
import {ErrorMessage,Modal,Loading} from '@'
import { Fullscreen } from '@karsegard/react-core-layout';



const translations = {
    SEARCH_table_column_lastname:'Nom',
    SEARCH_table_column_firstname:'Prenom',
    SEARCH_table_column_birthdate:'Date de Naissance',
    SEARCH_table_column_pathological_group: "Groupe Pathologique",
    SEARCH_table_column_sex: "Sexe",
    SEARCH_table_column_sample_count:"Mesures"
}

const translate = key => {
    return translations[key] || key;
}

export default props => {

    return (
        <Fullscreen>
        <TranslationProvider value={{t:translate}}>
            <Page/>
           
        </TranslationProvider>
        </Fullscreen>
    )

}