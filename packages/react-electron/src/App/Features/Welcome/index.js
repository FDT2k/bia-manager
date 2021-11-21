import { useFileProvider } from '@/Context/File';
import { WelcomeScreen } from '@karsegard/react-bia-manager';
import React from 'react';


export default props => {
    const {actions:{open_file},selectors:{locked,file}} = useFileProvider();
    
   

  
    return (
        <WelcomeScreen handleOpenDatabase={open_file}/>
    )


}