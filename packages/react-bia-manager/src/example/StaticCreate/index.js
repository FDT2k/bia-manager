import { CustomListProvider, TranslationProvider,useTranslation } from '@';
import Page from '@/Features/CreateSubject';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';






const translations = {
    SEARCH_table_column_lastname: 'Nom',
    SEARCH_table_column_firstname: 'Prenom',
    SEARCH_table_column_birthdate: 'Date de Naissance',
    SEARCH_table_column_pathological_group: "Groupe Pathologique",
    SEARCH_table_column_sex: "Sexe",
    SEARCH_table_column_sample_count: "Mesures"
}

const translate = (key,args={}) => {
    Object.keys(args).forEach(k=>{
        key = key.replace(`{${k}}`,args[k])
    })
    return translations[key] || key;
}

const TestCreate = () => {
    const {t} = useTranslation();
    return (<CustomListProvider value={{
       
    }}>
        <Page />
    </CustomListProvider>)
}

export default props => {

    return (
        <Fullscreen>
            <TranslationProvider value={{ t: translate }}>
                <TestCreate />

            </TranslationProvider>
        </Fullscreen>
    )

}