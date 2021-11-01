import React from 'react';
import { useLocation } from "wouter";

import { LayoutFlex } from '@karsegard/react-core-layout'





export default Component => props => {


    const {select_patients_list_filtered:patients, search, clear_search,tags } = props;


    const [_, setLocation] = useLocation();
 
    


    const handleSearch = tags => {
        if (tags.length > 0) {
            search(tags);
        }else{
            clear_search();
        }
    }



    const handleSelectRow = (index, patient) => {
        if(patient && patient.id)
            setLocation("/editor/" + patient.id);
    }

    const handleCreate = _ => {
        setLocation("/create_subject");
    }


    const addFilter = filter => {
        
        debugger
    }

    return (
        <>
            <Component
               
                results={patients}
                tags={tags}
                addFilter={addFilter}
                handleSearch={handleSearch}
                handleCreate={handleCreate}
                handleSelectRow={handleSelectRow} />
        </>
    )
}
