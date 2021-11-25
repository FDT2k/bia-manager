import { CustomListProvider, TranslationProvider,useTranslation } from '@';
import {Page,Component as ListManager} from '@/Features/ListManager';
import {identity} from '@karsegard/composite-js';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';

import {module,ListsHoc,connectLists} from '@/Containers/ListManager'

import { Provider as StoreProvider, store } from '@/example/Store'

import {ListCrudHOC,ConnectCrudList} from '@/Containers/ListCrud';


store.manager.addModule(module);
import ListsManager from '@/Features/ListManager/List';
import ListCrud from '@/Features/ListManager/ListCrud';


const ListsManagerWithBackend = Component=>  props => {


    const getData=async _=>{
        return [
            {
              key: 'genders',
              name: 'genders',
              list: [
                {
                  id: 'F',
                  name: 'F'
                },
                {
                  id: 'M',
                  name: 'M'
                }
              ],
              id: 1
            },
            {
              key: 'physical_activity_rate',
              name: 'physical_activity_rate',
              list: [
                {
                  id: 'inconnue',
                  name: 'inconnue'
                },
                {
                  id: 'modérée',
                  name: 'modérée'
                }
              ],
              id: 2
            },
            {
              key: 'physical_activity_type',
              name: 'physical_activity_type',
              list: [
                {
                  id: 'inconnue',
                  name: 'inconnue'
                },
                {
                  id: 'N/A',
                  name: 'N/A'
                }
              ],
              id: 3
            },
            {
              key: 'machines',
              name: 'machines',
              list: [
                {
                  id: 'NUTRIGUARD',
                  name: 'NUTRIGUARD'
                },
                {
                  id: 'Xitron',
                  name: 'Xitron'
                }
              ],
              id: 4
            },
            {
              key: 'pathological_groups',
              name: 'pathological_groups',
              list: [
                {
                  id: 'VH',
                  name: 'VH',
                  _id: 'Y8p7Aow1DInGRIZQ13rlm'
                },
                {
                  id: 'VENS2017',
                  name: 'VENS2017',
                  _id: '3_Ec_Dm-btRzkeTFfxvfJ'
                },
                {
                  id: 'OB-CH',
                  name: 'OB-CH',
                  _id: 'nIRNQRcYiusVP3OcB2qG6'
                },
                {
                  id: 'VENS2015',
                  name: 'VENS2015',
                  _id: 'SUxZnLm7xWJHyjM4hxDML'
                },
                {
                  id: 'VENS2013',
                  name: 'VENS2013',
                  _id: 'aIvZIy9s6ydKkhuazfuqy'
                },
                {
                  id: 'VENS2010',
                  name: 'VENS2010',
                  _id: 'yfNweU_f5HyEXcExEjqVu'
                }
              ],
              id: 5
            },
            {
              key: 'ethnological_groups',
              name: 'ethnological_groups',
              list: [
                {
                  id: 'Caucasien',
                  name: 'Caucasien'
                }
              ],
              id: 6
            },
            {
              key: 'examinators',
              name: 'examinators',
              list: [
                {
                  id: 'Miserez',
                  name: 'Miserez'
                },
                {
                  id: 'Karsegard',
                  name: 'Karsegard'
                },
                {
                  id: 'Charlotte',
                  name: 'Charlotte'
                },
                {
                  id: 'Alain',
                  name: 'Alain'
                },
                {
                  id: 'Laura',
                  name: 'Laura'
                },
                {
                  id: 'Rachel',
                  name: 'Rachel'
                }
              ],
              id: 7
            }
          ]
      
    }
    return (<Component getData={getData} {...props}/>)
}


const ListCrudWithBackend = Component=>  props => {

    const getData=async _=>{

        return [

        ]
    };
    return (<Component getData={getData} {...props}/>)
}

const ListsManagerWithRedux =  ListsManagerWithBackend(connectLists(ListsHoc(ListsManager)));
const ListCrudWithRedux = ListCrudWithBackend(ConnectCrudList(ListCrudHOC(ListCrud)));
debugger;

export default props => {

    return (
        <Fullscreen>
            <StoreProvider>
            <TranslationProvider value={{ t: identity }}>
                <Page>
                    <ListManager ListsManagerComponent={ListsManagerWithRedux} ListCrudComponent={ListCrudWithRedux} />
                </Page>
            </TranslationProvider>
            </StoreProvider>
        </Fullscreen>
    )

}