import React from 'react'


import {
    ListManagerProvider,
    ListManagerPage,
    ListManagerFeature
} from '@karsegard/react-bia-manager'


export default props => {

    return <ListManagerProvider><ListManagerPage><ListManagerFeature/></ListManagerPage></ListManagerProvider>
}