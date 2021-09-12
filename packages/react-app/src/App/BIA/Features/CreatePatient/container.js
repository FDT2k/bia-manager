import useBIAManager from '@/hooks/useBIAManager';

import React, { useEffect } from 'react';
import { useLocation } from "wouter";

import {normalize as normalize_patient} from '@/references/Patient'


    
export default Component=> props => {
    const {api} = useBIAManager();
    const {
        refresh_editor_lists,
        default_subject_form_options,
        subject_form_available_options,
        create_subject,edited_subject,
        edit_subject
    } = props;
    //const {select_genders,select_ethno_group,select_list_pathological_groups,patient} = props
    //const [location, setLocation] = useLocation();
    useEffect(()=>{
        refresh_editor_lists().then(
            res => create_subject(default_subject_form_options)
        );

        
    },[])
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
    


    const handleChange = values => {
      //  debugger;
       /// edit_subject(values);
    }

    const handleSave = values => {
     
      /* dispatch(create_patient(api.create_patient,normalize_patient(values),false)).then(res=>{
            setLocation('/editor/'+res.id)
       }).catch(res=>{

            alert('error')
       });*/
        
    }

    

    return (
        <>
            <Component /*handleChange={handleChange}  handleSave={handleSave} available_options={{genders:[],etno_groups:[],patho_groups:[]}}*/ handleChange={handleChange} patient={edited_subject}  available_options={subject_form_available_options}/>
        </>
    )
}
