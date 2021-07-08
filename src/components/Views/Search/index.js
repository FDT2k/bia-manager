import React from 'react';

import MainView from 'bia-layout/views/MainView'

import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from "wouter";
import useBIAManager from 'hooks/useBIAManager';


import {update_search_tags,search} from 'Redux/Patient/actions';
import {select_patients_list,select_count_results} from 'Store';


export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const {api} = useBIAManager();



    const sel_patients = useSelector(select_patients_list);
    const results_count = useSelector(select_count_results);


    const handleSearch = tags => {

        console.log(tags);

        dispatch(update_search_tags(tags))
        dispatch(search(_=> api.search({nom:'karsegard'})))
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
