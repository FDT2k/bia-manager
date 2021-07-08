import React from 'react';

import Editor from 'bia-layout/views/Editor'

import { useDispatch,useSelector } from 'react-redux';
import { useLocation,useRoute,useRouter } from "wouter";
import useBIAManager from 'hooks/useBIAManager';

import {update_search_tags,search} from 'Redux/Patient/actions';
import {select_patients_list,select_count_results} from 'Store';


export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const {api} = useBIAManager();
    const [match, params] = useRoute("/editor/:id");

    console.log(match,params);
    return (
        <Editor handleGoBack={_=>setLocation('/search')}/>
    )
}
