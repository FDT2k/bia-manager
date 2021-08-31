import React, { useEffect, useState } from 'react';
import CreatePatient from '@/bia-layout/Pages/CreatePatient';
import { useLocation } from "wouter";

import useBIAManager from '@/hooks/useBIAManager';
import {useDispatch, useSelector} from 'react-redux'; 

import {populate_genders,select_genders,populate_ethno_groups,select_ethno_group
,select_subject_form ,select_empty_subject,create_subject,
    fetch_pathological_groups,select_list_pathological_groups, edit_subject} from '@/Store';

export default props => {
    const {api} = useBIAManager();

    const [location, setLocation] = useLocation();

    const dispatch = useDispatch();

    useEffect(()=>{
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

        
        dispatch(create_subject())
    },[])
 
    const genders = useSelector(select_genders);
    const etno_groups =useSelector(select_ethno_group);
    const patho_groups =useSelector(select_list_pathological_groups);
    const patient = useSelector(select_subject_form)


    const handleChange = values => {
        
        dispatch(edit_subject(values));
    }



    return (
        <>
            <CreatePatient handleChange={handleChange} patient={patient} available_options={{genders,etno_groups,patho_groups}}/>
        </>
    )
}
