import React, { useEffect,useState } from 'react';

import { CreateSubjectFeature, useCustomList, useBackend } from '@karsegard/react-bia-manager'
import { useHostProvider } from '@/Context/Host'
import { as_safe_path, enlist } from '@karsegard/composite-js'
export default props => {
    const { lists, forms } = useCustomList();

    const { create_subject } = useBackend();
    const { add_error } = useHostProvider();
    const [patient,setPatient] = useState({
        firstname:'',
        lastname:'',
        usual_height:'',
        usual_weight:'',
        groups:{
            patho:'',
            ethno:''
        },
        birthdate: new Date()
    });
    useEffect(() => {
        if (forms.create_subject) {
            let custom_forms =forms.create_subject.reduce((carry, item) => {
                const { list_key, path } = item;
                const list = lists[list_key];
                if (list) {
                  //  carry[path] = list[0].value

                  carry = as_safe_path(path,carry,list[0].value)

                }
                return carry;
            }, patient)
            setPatient(custom_forms)

        }

    }, [forms])

    const handleSave = values => {
        Promise.resolve(create_subject(values))
            .then(result=>{
                window.location.href='#/editor/'+result
            })
            .catch(add_error)
    };


    return <CreateSubjectFeature lists={lists} forms={forms.create_subject} handleSave={handleSave}  patient={patient}/>
}