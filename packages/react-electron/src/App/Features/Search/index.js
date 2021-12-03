import React from 'react';

import { searchWithReduxModule, searchWithBackend,searchReduxModule } from '@karsegard/react-bia-manager';
import { SearchPage, SearchFeature } from '@karsegard/react-bia-manager';

import { Provider as StoreProvider, store } from '@/Store'
import {useBackend} from '@karsegard/react-bia-manager'

import { useSelector} from '@karsegard/react-redux';

const Search = searchWithReduxModule(store)(searchWithBackend(SearchFeature))


export default props => {

    const {stats,db_name,exportToCSV} = useBackend();
    const search_count = useSelector(searchReduxModule.selectors.count);
    return (<SearchPage stats={stats} db_name={db_name} search_count={search_count}>
        <Search handlers={{
            handleCreate:_=>{debugger; window.location.hash='#/create_subject'},
            handleSelectRow: (idx,patient)=> {
                window.location.hash=`#/editor/${patient.id}`
            },
            handleCSVExport: _=> exportToCSV(),

            }}/>
    </SearchPage>)
}