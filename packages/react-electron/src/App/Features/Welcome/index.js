import { useFileProvider } from '@/Context/File';
import { WelcomeScreen } from '@karsegard/react-bia-manager';
import React,{useState} from 'react';
import { useBackend } from '@karsegard/react-bia-manager'

import SQLiteAskKey from '@/Components/SQLiteAskKey';

export default props => {
    const { actions: { open_file }, selectors: { locked, file } } = useFileProvider();
    const { create_database,type } = useBackend();

    const [ask_key,setAskKey] = useState(false);


    const create_db = ()=> {
        if(type ==='sqlite'){
            setAskKey(true)

        }else {
            create_database();
        }
    }


    const handleSubmit = ({key})=>{
        setAskKey(false)

        create_database({filename:'bia-database.sqlite',key}).catch(add_error)
    }

    return (<>
        <SQLiteAskKey visible={ask_key} handleCancel={_=>setAskKey(false)} handleSubmit={handleSubmit}/>
        <WelcomeScreen handleOpenDatabase={open_file} handleCreateDatabase={create_db} />
    </>
    )


}