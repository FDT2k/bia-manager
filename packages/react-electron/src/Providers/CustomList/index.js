import React, { useEffect, useState } from 'react';
import { CustomListProvider } from '@karsegard/react-bia-manager';

import { useBackend } from '@karsegard/react-bia-manager';


export default ({children}) => {


    const {get_lists, get_forms} = useBackend();
    const [lists,setList]= useState({})
    const [forms,setForms]= useState({})

    const [patient, setPatient] = useState( {
        firstname:'',
        lastname:'',
        usual_height:'',
        usual_weight:'',
        groups:{
            patho:'',
            ethno:''
        },
        birthdate: ''
    });



    useEffect(()=>{
        get_lists().then(res=> {

            setList(res)
            return get_forms()
        }).then(res=>{
            setForms(res)

           
        })

    },[])
    return (


        <CustomListProvider lists={lists} forms={forms}>
            {children}

        </CustomListProvider>
    )
}