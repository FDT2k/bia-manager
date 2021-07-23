import React from 'react';

import Editor from 'bia-layout/views/Editor'

import { useDispatch,useSelector } from 'react-redux';
import { useLocation,useRoute,useRouter } from "wouter";
import useBIAManager from 'hooks/useBIAManager';

import {update_search_tags,search} from 'Store';
import {select_patients_list,select_count_results,select_patient} from 'Store';



export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const {api} = useBIAManager();
    const [match, params] = useRoute("/editor/:id");

    const patient =  useSelector(select_patient(params.id));



    return (
        <Editor handleGoBack={_=>setLocation('/search')} data={patient}/>
    )
}
