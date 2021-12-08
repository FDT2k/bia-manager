import React, { useState } from 'react';

import Database from '@/Features/DatabaseSync'


export default props =>{
    const [files,setFiles] = useState([]);


    const handleDrop = (fileList) =>{


        debugger;

        setFiles(files=> {
            return [...files,...fileList]
        })
    }

    return (

        <Database files={files} handleDrop={handleDrop}/>
    )


}