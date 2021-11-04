import React from 'react';
import { useLocation } from "wouter";

import { LayoutFlex } from '@karsegard/react-core-layout'





export default Component => props => {


    const { select_patients_list_filtered: patients, search, clear_search, tags, update_tags,custom_filters,clear_custom_filter,add_custom_filter } = props;


    const [_, setLocation] = useLocation();




    const handleSearch = tags => {
       // if (tags.length > 0) {
            search(tags)
       // } 
    }



    const handleSelectRow = (index, patient) => {
        if (patient && patient.id)
            setLocation("/editor/" + patient.id);
    }

    const handleCreate = _ => {
        setLocation("/create_subject");
    }


    const setFilter = (filter,key,values,type='date_range') => {
        add_custom_filter(filter,values,type,key)
        search(tags)

    }

    const clearFilter = filter => {
        clear_custom_filter(filter)
        search(tags)
    }
    

    return (
        <>
            <Component

                results={patients}
                tags={tags}
                custom_filters={custom_filters}
                setFilter={setFilter}
                clearFilter={clearFilter}
                handleSearch={handleSearch}
                handleCreate={handleCreate}
                handleSelectRow={handleSelectRow} />
        </>
    )
}
