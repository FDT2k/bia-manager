import React from 'react';
import { useLocation } from "wouter";

import { LayoutFlex } from '@karsegard/react-core-layout'





export default Component => props => {


    const {select_patients_list_filtered:patients, search,get_backend_stats: stats,db_name,tags } = props;

    const {count,count_mesures} = stats;

    const [location, setLocation] = useLocation();
 
    


    const handleSearch = tags => {
        if (tags.length > 0) {


      

            search(tags);
        }
    }



    const handleSelectRow = (index, patient) => {
        if(patient && patient.id)
            setLocation("/editor/" + patient.id);
    }

    const handleCreate = _ => {
        setLocation("/create_subject");
    }


    return (
        <>
            <Component
               
                results={patients}
                tags={tags}
                handleSearch={handleSearch}
                handleCreate={handleCreate}
                handleSelectRow={handleSelectRow} />
        </>
    )
}
