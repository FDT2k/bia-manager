import React from 'react';

import MainView from 'bia-layout/views/MainView'

import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from "wouter";
import useBIAManager from 'hooks/useBIAManager';


import {update_search_tags,search} from 'Store';
import {select_patients_list_filtered,select_count_results} from 'Store';


export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const {api} = useBIAManager();



    const sel_patients = useSelector(select_patients_list_filtered);
    const results_count = useSelector(select_count_results);


    const handleSearch = tags => {
        if(tags.length>0){

            const [dbsearch,...rest] =tags;

            const query = _=> api.search([dbsearch]);

            dispatch(search(query,rest))
            .catch(err=>{
                console.error('search error',err);
            })
        }
    }


    const patients = sel_patients;



    const handleSelectRow =  index => {
        console.log(index, patients[index]);
        setLocation("/editor/"+patients[index].id);
    }
    return (
        <MainView results={patients} handleSearch={handleSearch} handleSelectRow={handleSelectRow}/>
    )
}
