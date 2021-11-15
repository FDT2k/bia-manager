import React from 'react'
import Component from './component'
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';


export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query
        } } = useElectron()


    const callback = values => {

        if(values.type =="import_subject"){
            let [vals,garbage] = spreadObjectPresentIn(['lastname','firstname','birthdate','uuid'],values.subject) 
            
            sqlite_query({type:'geninsert',table:'subjects',values:vals,fn:'run'})
        }


        if(values.type =="import_mesure"){
            let [vals,garbage] = spreadObjectPresentIn(['id','date','examinator'],values.mesure) 
            
            sqlite_query({type:'geninsert',table:'mesures',values:vals,fn:'run'})
        }
    }

    return (<Component callback={callback} />)
}