
import React, { useEffect } from 'react';
import { useLocation } from "wouter";



    
export default Component=> props => {
    const {
        refresh_editor_lists,
        subject_form_default_options,
        subject_form_available_options,
        create_subject,edited_subject,
        form_options_loaded,
        create_patient,
        custom_lists
    } = props;

    //const {select_genders,select_ethno_group,select_list_pathological_groups,patient} = props
    const [location, setLocation] = useLocation();

    useEffect(()=>{
        refresh_editor_lists();
    },[])

    useEffect(()=>{
        create_subject(subject_form_default_options)
    },[form_options_loaded])
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
        create_patient(values).then(res=> {
            debugger;
            setLocation('/editor/'+res.id)
        }).catch(res=>{

            alert('error',res.toString())
       });
    }


    return (
        <>
            <Component /*handleChange={handleChange}  handleSave={handleSave} available_options={{genders:[],etno_groups:[],patho_groups:[]}}*/ handleChange={handleChange} patient={edited_subject}  available_options={custom_lists}  handleSave={handleSave} />
        </>
    )
}
