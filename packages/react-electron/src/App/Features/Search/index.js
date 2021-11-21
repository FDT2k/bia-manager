import React from 'react';

import { searchWithReduxModule, searchWithBackend } from '@karsegard/react-bia-manager';
import { SearchPage, SearchFeature } from '@karsegard/react-bia-manager';

import { Provider as StoreProvider, store } from '@/Store'

const Search = searchWithReduxModule(store)(searchWithBackend(SearchFeature))


export default props => {


    return (<SearchPage>
        <Search handlers={{handleCreate:_=>window.location.hash='#/create_subject'}}/>
    </SearchPage>)
}