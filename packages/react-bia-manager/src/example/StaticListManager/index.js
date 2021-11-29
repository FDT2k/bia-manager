import { BackendProvider,CustomListProvider, TranslationProvider,useTranslation } from '@';
import {Page,Component as ListManager} from '@/Features/ListManager';
import {identity} from '@karsegard/composite-js';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';

import {module,ListsHoc,connectLists} from '@/Containers/ListManager'

import { Provider as StoreProvider } from '@/example/Store'

import {ListCrudHOC,ConnectCrudList} from '@/Containers/ListCrud';

import {Provider as  ListManagerProvider} from '@/Context/ListManager';

import ListsManager from '@/Features/ListManager/List';
import ListCrud from '@/Features/ListManager/ListCrud';

import sample from './sample'

/*
const ListsManagerWithBackend = Component=>  props => {


    const getData=async _=>{
        return sample
      
    }

    const save = (values )=> {
      debugger;
    }
    return (<Component getData={getData}  handleSave={save}{...props}/>)
}


const ListCrudWithBackend = Component=>  props => {
    const getData=async _=>{

        let res =  sample.find((item)=> { return item.key ==props.list_key});

        return res.list;
    };

    const save = (values )=> {
      debugger;
    }

    return (<Component getData={getData} handleSave={save} {...props}/>)
}

const ListsManagerWithRedux =  ListsManagerWithBackend(connectLists(ListsHoc(ListsManager)));
const ListCrudWithRedux = ListCrudWithBackend(ConnectCrudList(ListCrudHOC(ListCrud)));
*/


const FakeBackend = ({children}) => {

    const fetch_lists = async ()=> {

        return sample;
    }

    const fetch_list = async (list_key)=> {
        let res =  sample.find((item)=> { return item.key ==list_key});
        return res &&  res.list || [];
    }

    let actions = {
        fetch_lists,
        fetch_list
    }
    return (<BackendProvider actions={actions}><ListManagerProvider>{children}</ListManagerProvider></BackendProvider>)
}

export default props => {

    return (
        <Fullscreen>
            <StoreProvider>
            <TranslationProvider value={{ t: identity }}>
            <FakeBackend>
                <Page>
                   
                        <ListManager />
                  
                </Page>
                </FakeBackend>
            </TranslationProvider>
            </StoreProvider>
        </Fullscreen>
    )

}