import React, { useEffect, useState } from 'react';
import Printable from '@/bia-layout/components/Printable';
import PrintableReport from '@/App/BIA/Features/Editor/Mesure/PrintableReport';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRoute } from "wouter";

import { change_mesure, create_mesure, edit_mesure, edit_patient, fetch_normes, populate_sporttype, populate_sportrate, refresh_recap, select_current_bia_values, select_current_mesure_id, select_edited_mesure, select_edited_patient,change_subject, select_mass_chart, has_error, error_message,refresh_current_recap, select_recap_headers,select_current_patient_id, select_recap_list,recompute_current_mesure, populate_machines,save, recompute_mesure } from '@/Store';
import useBIAManager from '@/hooks/useBIAManager';



export default props => {
    const { api } = useBIAManager();
    const [matchWithMesure, paramsWithMesure] = useRoute("/print/:id/:mesure_id");
    
    const dispatch = useDispatch();
    const recap = useSelector(select_recap_list);
    const curr_mesure_id = useSelector(select_current_mesure_id);
    const curr_patient_id = useSelector(select_current_patient_id);

    useEffect(()=>{

       const {id,mesure_id} = paramsWithMesure;
       if(curr_patient_id == -1){
       api.get_patient(id).then(res => {
            dispatch(fetch_normes())
            dispatch(edit_patient(res));
            dispatch(edit_mesure(id, mesure_id));        
            dispatch(recompute_current_mesure());        
            dispatch(refresh_current_recap());        

        });
    }

    },[])

    return (
        <>
       {recap.length >0&&
        <PrintableReport />
    }
    </>)

}