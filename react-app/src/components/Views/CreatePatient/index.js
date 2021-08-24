import React, { useEffect, useState } from 'react';
import CreatePatient from 'bia-layout/Pages/CreatePatient';
import { useLocation } from "wouter";


import {useDispatch, useSelector} from 'react-redux'; 

import {populate_genders,select_genders,populate_ethno_groups,select_ethno_group} from 'Store';

export default props => {
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
    },[])
 
    const genders =useSelector(select_genders);
    const etno_groups =useSelector(select_ethno_group);

    return (
        <>
            <CreatePatient available_options={{genders,etno_groups}}/>
</>
    )
}
