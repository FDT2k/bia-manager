
import React, { useEffect } from 'react';
import { useLocation } from "wouter";



    
export default Component=> props => {
    const {
        refresh_editor_lists,
        edited_subject,
        create_patient,
        custom_lists
    } = props;

    const [location, setLocation] = useLocation();

    useEffect(()=>{
        refresh_editor_lists();
    },[])


    

    const handleSave = values => {
     
     
        create_patient(values).then(res=> {
            setLocation('/editor/'+res.id)
        }).catch(res=>{

            alert('error',res.toString())
       });
    }


    return (
        <>
            <Component  handleChange={handleChange} patient={edited_subject}  available_options={custom_lists}  handleSave={handleSave} />
        </>
    )
}
