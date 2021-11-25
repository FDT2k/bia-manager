import React from 'react';

import { searchWithReduxModule, searchWithBackend } from '@karsegard/react-bia-manager';
import { SearchPage, SearchFeature } from '@karsegard/react-bia-manager';

import { Provider as StoreProvider, store } from '@/Store'
import {useBackend} from '@karsegard/react-bia-manager'

const Search = searchWithReduxModule(store)(searchWithBackend(SearchFeature))


export default props => {

    const {stats,db_name,search_count} = useBackend();

    
    return (<SearchPage stats={stats} db_name={db_name} search_count={search_count}>
        <Search handlers={{
            handleCreate:_=>{debugger; window.location.hash='#/create_subject'},
            handleSelectRow: (idx,patient)=> {
                window.location.hash=`#/editor/${patient.id}`
            }
            }}/>
    </SearchPage>)
}