import React, { useEffect, useState,useRef } from 'react';

import { is_nil } from '@karsegard/composite-js';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRoute, useRouter } from "wouter";
import useBIAManager from 'hooks/useBIAManager';

import Editor from 'bia-layout/pages/Editor'

import { select_patient,select_current_mesure_id, create_mesure,refresh_recap, recompute_mesure, change_mesure,edit_patient, edit_mesure,select_recap,select_mesures_dates, select_edited_patient, select_edited_mesure, compute_formulas,fetch_physical_activities } from 'Store';

import { useReactToPrint } from 'react-to-print'
import Component from 'bia-layout/components/Table/Pagination';

import { select_recap_list, select_recap_headers, select_mass_chart } from 'Store';

import { BarHorizontalStacked } from 'bia-layout/components/Charts'

import RecapGrid from 'bia-layout/components/Views/RecapGrid';

export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const { api } = useBIAManager();
    const componentRef = useRef();

    const [patient_id, setPatientId] = useState();
    const [mesure_id, setMesureId] = useState();

    const handlePrint = useReactToPrint({
        content:() => componentRef.current
    })

 //   const [selectedMesureIdx, setSelectedMesureIdx] = useState(mesure_id);


    const [match, params] = useRoute("/editor/:id");
    const [matchWithMesure, paramsWithMesure] = useRoute("/editor/:id/:mesure_id");

    
    const mass_chart = useSelector(select_mass_chart);
    const recap = useSelector(select_recap_list);
    const list_dates = useSelector(select_recap_headers);

    //console.log('editor rendering')

    //if any of the url argument changes, update internal state
    useEffect(() => {
      //  console.log('url changed',params,paramsWithMesure);
        if (match) {
            if (patient_id !== params.id) {
                setPatientId(params.id);
            }
            //setMesureId(-1);
        } else if (matchWithMesure) {
            if (patient_id != paramsWithMesure.id) {
                setPatientId(paramsWithMesure.id);
            }
            if (paramsWithMesure.mesure_id !== mesure_id) {
                setMesureId(paramsWithMesure.mesure_id);
            //    setSelectedMesureIdx(paramsWithMesure.mesure_id)
            }
        }
    }, [params, paramsWithMesure]);


    const patient = useSelector(select_edited_patient);
    const mesure = useSelector(select_edited_mesure);
    const current_mesure_id = useSelector(select_current_mesure_id);

    //We load patient from the currently setted patient_id if not already loaded

    useEffect(() => {
     //   console.log('patient changed?',patient_id)
        if (!is_nil(patient_id)  && ( (patient && patient_id != patient.id) || !patient)) {
            api.get_patient(patient_id).then(res => {
                dispatch(edit_patient(res));

            });
        }
    }, [patient_id]);
    
    useEffect(() => {
      //  console.log('ba', mesure_id,patient)
        if (!is_nil(patient) ) {

            if (!is_nil(mesure_id)) {
                dispatch(edit_mesure(patient_id, mesure_id));
            } else {
                new_mesure(patient.id).then(res => {
                    // setMesureId(res.payload.mesure_id);
                //    setSelectedMesureIdx(res.payload.mesure_id)
                });
            }

        }
    }, [mesure_id, patient]);


   
    const new_mesure = patient_id => {
        return Promise.resolve(dispatch(create_mesure(patient_id)));

    }

    const handleMesureOpen = (value, idx) => {
        dispatch(fetch_physical_activities([]));
        if (idx < patient.mesures.length) {
            setLocation(`/editor/${patient_id}/${idx}`);
        } else {
            setLocation(`/editor/${patient_id}`);
        }
    }

    const handleChange = values => {
        console.log(values);
        if (values.data && patient) {
          //  dispatch(recompute_mesure(patient_id, values));
            dispatch(change_mesure(patient,values))
          dispatch(refresh_recap(patient_id,current_mesure_id));
        }
    }

    return (
        <>
        <Editor
            handleGoBack={_ => setLocation('/search')}
            handleChange={handleChange}
            data={patient}
            handleMesureOpen={handleMesureOpen}
            selectedMesureIndex={current_mesure_id}
            mesure={mesure}
            />

        <div ref={componentRef}>
            <RecapGrid data={recap} headers={list_dates}/>
            <BarHorizontalStacked data={mass_chart} />
        </div>
        </>
    )
}
