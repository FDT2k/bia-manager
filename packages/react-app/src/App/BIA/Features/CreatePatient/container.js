import useBIAManager from '@/hooks/useBIAManager';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "wouter";

import {normalize as normalize_patient} from '@/references/Patient'


    
export default Component=> props => {
    const {api} = useBIAManager();

    const [location, setLocation] = useLocation();

    const dispatch = useDispatch();

   /* useEffect(()=>{
        dispatch(create_subject())

        dispatch(populate_genders([
            { 'id': 'M', 'name': 'Male',default:true },
            { 'id': 'F', 'name': 'Female' },
          
        ]));
        dispatch(populate_ethno_groups([
            { 'id': 'caucasian', 'name': 'Caucasien', default:true },
            { 'id': 'african', 'name': 'Africain' },
            { 'id': 'asian', 'name': 'Asiatique' },
            { 'id': 'latino', 'name': 'Latino' },
          
        ]));

        api.all_pahological_groups().then(res=> {
            dispatch(fetch_pathological_groups(res.map(item=>({id:item,name:item}))))
        })

        
    },[])
 */
    const genders = useSelector(select_genders);
    const etno_groups =useSelector(select_ethno_group);
    const patho_groups =useSelector(select_list_pathological_groups);
    const patient = useSelector(select_subject_form)


    const handleChange = values => {
        
        dispatch(edit_subject(values));
    }

    const handleSave = values => {
     
       dispatch(create_patient(api.create_patient,normalize_patient(values),false)).then(res=>{
            setLocation('/editor/'+res.id)
       }).catch(res=>{

            alert('error')
       });
        
    }

    

    return (
        <>
            <Component handleChange={handleChange} patient={patient} handleSave={handleSave} available_options={{genders,etno_groups,patho_groups}}/>
        </>
    )
}
