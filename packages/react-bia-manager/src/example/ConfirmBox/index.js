import { TranslationProvider, Button } from '@';
import { Page, Component } from '@/Features/Search';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';


import { BackendProvider, ConfirmProvider, ConfirmDialog, useConfirm } from '@';




const translations = {
    SEARCH_table_column_lastname: 'Nom',
    SEARCH_table_column_firstname: 'Prenom',
    SEARCH_table_column_birthdate: 'Date de Naissance',
    SEARCH_table_column_pathological_group: "Groupe Pathologique",
    SEARCH_table_column_sex: "Sexe",
    SEARCH_table_column_sample_count: "Mesures"
}

const translate = key => {
    return translations[key] || key;
}

const TestComponent = props => {

    const { isConfirmed } = useConfirm();
    const click = async _ => {
        let result = await isConfirmed('test', {
            fields: [
                { type: 'password', 'name': 'password', 'label': 'Password', autoFocus: true },
                { type: 'password', 'name': 'confirm_password', 'label': 'Confirm Password', },
            ],
            form:{password:'',confirm_password:''},
            validate: (values)=> {
                console.log(values)
                return false;
            }
        })
        console.log(result);
    }
    return (<Button onClick={click}>test</Button>)

}
export default props => {

    return (
        <Fullscreen>
            <TranslationProvider value={{ t: translate }}>
                <ConfirmProvider>
                    <ConfirmDialog />
                    <TestComponent />
                </ConfirmProvider>
            </TranslationProvider>
        </Fullscreen>
    )

}