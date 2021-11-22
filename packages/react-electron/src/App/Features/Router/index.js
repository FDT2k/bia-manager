import React,{useEffect} from 'react';
import { useFileProvider } from '@/Context/File';
import { useLocation } from '@karsegard/react-bia-manager';
import {is_empty } from '@karsegard/composite-js'

import {useElectron} from '@/Context/Electron'

export default props => {
    const {actions:{open_file},selectors:{locked,file}} = useFileProvider();
    const [location,setLocation] = useLocation();

    const {subscribers:{handleLocationChange}}  = useElectron();
    // redirect if file is open/unlocked
    useEffect(()=> {
        handleLocationChange((e,arg)=>{
                window.location.href = arg;
        })
    },[])
    useEffect(()=>{
        if(!is_empty(file) && locked === false){
            setLocation('#/search')
        }else if(is_empty(file)){
            setLocation('#/')
        }
    },[locked,file])
    return  null;


}