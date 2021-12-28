import React, { useEffect,useState } from 'react';

import { CreateSubjectFeature, useCustomList, useBackend } from '@karsegard/react-bia-manager'
import { useHostProvider } from '@/Context/Host'
import { as_safe_path, enlist } from '@karsegard/composite-js'
import moment from 'moment'
export default props => {
    const { lists, forms } = useCustomList();

    const { create_subject,sensitive_lock } = useBackend();
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
        birthdate: ''
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
            
        let _vals = {
            ...values,
            birthdate:  moment(values['birthdate'],'DD.MM.YYYY').format("YYYY-MM-DD")
        };
        Promise.resolve(create_subject(_vals))
        
            .then(result=>{
                window.location.href='#/editor/'+result
            })
            .catch(add_error)
    };


    return <CreateSubjectFeature lists={lists} forms={forms.create_subject} locked={sensitive_lock} handleSave={handleSave}  patient={patient}/>
}