import React, { useEffect, useState } from 'react';

import { is_nil } from '@karsegard/composite-js';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRoute, useRouter } from "wouter";
import useBIAManager from 'hooks/useBIAManager';

import Editor from 'bia-layout/pages/Editor'

import { select_patient,create_mesure, recompute_mesure,edit_patient,edit_mesure,select_edited_patient,select_edited_mesure,compute_formulas } from 'Store';



export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const { api } = useBIAManager();

    const [patient_id, setPatientId] = useState();
    const [mesure_id, setMesureId] = useState();
    const [selectedMesureIdx, setSelectedMesureIdx] = useState(mesure_id);

  
    const [match, params] = useRoute("/editor/:id");
    const [matchWithMesure, paramsWithMesure] = useRoute("/editor/:id/:mesure_id");


    //if any of the url argument changes, update internal state
    useEffect(() => {
        if (match) {
            setPatientId(params.id);
            //setMesureId(-1);
        } else if (matchWithMesure) {
            setPatientId(paramsWithMesure.id);
            setMesureId(paramsWithMesure.mesure_id);
            setSelectedMesureIdx(paramsWithMesure.mesure_id)
        }
    }, [match, matchWithMesure,params,paramsWithMesure]);


    const patient = useSelector(select_edited_patient(patient_id));
    const mesure =  useSelector(select_edited_mesure(patient_id))

    //We load patient from the given url argument

    useEffect(() => {
        if (!is_nil(patient_id)) {
            api.get_patient(patient_id).then(res => {
                dispatch(edit_patient(res));

            });
        }
    }, [patient_id]);

    useEffect(() => {
        if (!is_nil(patient)) {

            if (!is_nil(mesure_id)) {
                dispatch(edit_mesure(patient_id,mesure_id));
            }else{
                new_mesure(patient_id)
            }

        }
    }, [mesure_id,patient]);

    const new_mesure = patient_id => {
        Promise.resolve(dispatch(create_mesure(patient_id))).then(res => {
            // setMesureId(res.payload.mesure_id);
            setSelectedMesureIdx(res.payload.mesure_id)
         });

    }

    const handleMesureOpen = (value,idx)=> {
        if(idx < patient.mesures.length){
           setLocation(`/editor/${patient_id}/${idx}`);
        }else{
            setLocation(`/editor/${patient_id}`);
        }
    }

    const handleChange =  values =>{
        if(values.data){
            dispatch(recompute_mesure(patient_id,values));

        }
    }

    return (
        <Editor
            handleGoBack={_ => setLocation('/search')}
            handleChange={handleChange}
            data={patient}
            handleMesureOpen={handleMesureOpen}
            selectedMesureIndex={selectedMesureIdx}
            mesure={mesure}/>
    )
}
