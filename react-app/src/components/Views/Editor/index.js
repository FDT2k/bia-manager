import { is_nil, safe_path } from '@karsegard/composite-js';
//import { useKeypress } from '@karsegard/react-hooks';

import Editor from 'bia-layout/Pages/Editor';
import useBIAManager from 'hooks/useBIAManager';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { change_mesure, create_mesure, edit_mesure, edit_patient, fetch_normes, populate_sporttype, populate_sportrate, refresh_recap, select_current_bia_values, select_current_mesure_id, select_edited_mesure, select_edited_patient,change_subject, select_mass_chart, has_error, error_message, select_recap_headers, select_recap_list, populate_machines,save } from 'Store';
import { useLocation, useRoute } from "wouter";







const useKeypress =(targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);
    function downHandler({ key }) {
        console.log(key)
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); 
    return keyPressed;
  }



export default props => {
    const [location, setLocation] = useLocation();
    const dispatch = useDispatch();
    const { api } = useBIAManager();
    const componentRef = useRef();

    const debugPrint = useKeypress('l');
    



    const [patient_id, setPatientId] = useState();
    const [mesure_id, setMesureId] = useState();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    //   const [selectedMesureIdx, setSelectedMesureIdx] = useState(mesure_id);


    const [match, params] = useRoute("/editor/:id");
    const [matchWithMesure, paramsWithMesure] = useRoute("/editor/:id/:mesure_id");


    const mass_chart = useSelector(select_mass_chart);
    const recap = useSelector(select_recap_list);
    const list_dates = useSelector(select_recap_headers);


    useEffect(()=>{
        if(debugPrint){
            document.querySelector('#printWindow').style = 'position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:white;'
        }
    },[debugPrint]);
    
    useEffect(() => {
        dispatch(populate_sportrate([
            { 'id': 'low', 'name': 'faible' },
            { 'id': 'average', 'name': 'modérée', default: true },
            { 'id': 'high', 'name': 'élevée' },
            { 'id': 'very_high', 'name': 'très élevée' },
        ]));

        dispatch(populate_sporttype([
            { 'id': 'endu', 'name': 'endurance' },
            { 'id': 'res', 'name': 'résistance' },
            { 'id': 'other', 'name': 'autre' },
            { 'id': 'unknown', 'name': 'inconnue', default: true },
        ]));
        dispatch(populate_machines([
            { 'id': 'BIO-Z', 'name': 'BIO-Z' },
            { 'id': 'NUTRIGUARD', 'name': 'Nutriguard' },
            { 'id': 'ZX-1000', 'name': 'ZX-1000', default: true },
        ]));
        dispatch(fetch_normes())
    }, []);

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
    const error = useSelector(has_error);
    const err_message = useSelector(error_message);
    //We load patient from the currently setted patient_id if not already loaded

    useEffect(() => {
        //   console.log('patient changed?',patient_id)
        if (!is_nil(patient_id) && ((patient && patient_id != patient.id) || !patient)) {
            api.get_patient(patient_id).then(res => {
                dispatch(edit_patient(res));

            });
        }
    }, [patient_id]);


    

    useEffect(() => {
        //  console.log('ba', mesure_id,patient)
        if (!is_nil(patient)) {

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
            dispatch(change_mesure(patient, values))
            dispatch(refresh_recap(patient_id, current_mesure_id));
        }
    }

    const handleSubjectChange = values=>{
        dispatch(change_subject(patient_id,values));
    }


    const handleClickSave= _=> {
        let res = dispatch(save());

        
        if(current_mesure_id >= patient.mesures.length ){
            setLocation(`/editor/${patient_id}/${current_mesure_id}`);
        }
        
    }
    return (
        <>
            {!error && <Editor
                handleGoBack={_ => setLocation('/search')}
                handleChange={handleChange}
                handleSubjectChange={handleSubjectChange}
                handlePrint={handlePrint}
                data={patient}
                handleClickSave={handleClickSave}
                handleMesureOpen={handleMesureOpen}
                selectedMesureIndex={current_mesure_id}
                mesure={mesure}
            />}
            {error && <h1>{err_message}</h1>}

        </>
    )
}
