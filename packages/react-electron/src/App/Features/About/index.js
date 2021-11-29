import React from 'react';

import {AboutFeature} from '@karsegard/react-bia-manager'
import {useElectron} from '@/Context/Electron'

export default props => {
    const{actions:{open_url}} = useElectron();

    const openURL = (e,url)=> {
        open_url(url)
        e.preventDefault();
    }
    return <AboutFeature openURL={openURL}/>
}