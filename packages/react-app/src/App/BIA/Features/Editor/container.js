import { is_nil, safe_path } from '@karsegard/composite-js';
//import { useKeypress } from '@karsegard/react-hooks';

import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useLocation, useRoute } from "wouter";
import ErrorModal from '@/App/BIA/Features/Editor/ErrorModal';


export default Component => props => {
    const [location, setLocation] = useLocation();
    const componentRef = useRef();

    const { patient_id, mesure_id } = props.params;

    const { patient, mesure, current_mesure_id, error, err_message } = props;
    const { populate_sportrate, populate_sporttype, populate_machines, fetch_normes } = props;
    const { edit_patient, edit_mesure, create_mesure,change_mesure,refresh_recap,change_subject,update_patient,save,delete_mesure } = props;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })


    /*
    const mass_chart = useSelector(select_mass_chart);
    const recap = useSelector(select_recap_list);
    const list_dates = useSelector(select_recap_headers);
*/


    useEffect(() => {
       /* populate_sportrate([
            { 'id': 'low', 'name': 'faible' },
            { 'id': 'average', 'name': 'modérée', default: true },
            { 'id': 'high', 'name': 'élevée' },
            { 'id': 'very_high', 'name': 'très élevée' },
        ]);

        populate_sporttype([
            { 'id': 'endu', 'name': 'endurance' },
            { 'id': 'res', 'name': 'résistance' },
            { 'id': 'other', 'name': 'autre' },
            { 'id': 'unknown', 'name': 'inconnue', default: true },
        ]);
        
        populate_machines([
            { 'id': 'BIO-Z', 'name': 'BIO-Z' },
            { 'id': 'NUTRIGUARD', 'name': 'Nutriguard' },
            { 'id': 'ZX-1000', 'name': 'ZX-1000', default: true },
        ]);*/
        fetch_normes()
    }, []);




    //We load patient from the currently setted patient_id if not already loaded

    useEffect(() => {
        //   console.log('patient changed?',patient_id)
        if (!is_nil(patient_id) && ((patient && patient_id != patient.id) || !patient)) {
            /*  api.get_patient(patient_id).then(res => {
                  dispatch(edit_patient(res));
  
              });*/
            edit_patient(patient_id);
        }
    }, [patient_id]);




    useEffect(() => {

        //  console.log('ba', mesure_id,patient)
        if (!is_nil(patient)) {
            if (!is_nil(mesure_id) && mesure_id < patient.mesures.length) {
                edit_mesure(patient_id, mesure_id);
            } else {
                // new_mesure(patient.id).then(res => {
                // setMesureId(res.payload.mesure_id);
                //    setSelectedMesureIdx(res.payload.mesure_id)
                // });
                create_mesure(patient_id)
            }

        }
    }, [mesure_id, patient]);



    const new_mesure = patient_id => {
        return Promise.resolve(create_mesure(patient_id));
    }
    
    const handleMesureOpen = (value, idx) => {
        if (idx < patient.mesures.length) {
            setLocation(`/editor/${patient_id}/${idx}`);
        } else {
            setLocation(`/editor/${patient_id}`);
        }
    }

    const handleMesureCreate = _ => {
        setLocation(`/editor/${patient_id}`);

    }

    const handleChange = values => {
        console.log(values);
        if (values.data && patient) {
            //  dispatch(recompute_mesure(patient_id, values));
            change_mesure(patient, values)
            refresh_recap(patient_id, current_mesure_id);
        }
    }

    const handleSubjectChange = values => {
        change_subject(patient_id, values);
    }


    const handleClickSave = _ => {
        let res = save();
        update_patient(patient.id, patient, mesure, current_mesure_id).then(res => {
            if (current_mesure_id <= patient.mesures.length) {
                setLocation(`/editor/${patient_id}/${current_mesure_id}`);
            }
        }).catch(res => {
            alert('erreur ')
            debugger;
            console.error(res)

        }
        );

    }

        const handleMesureDelete = index => {
            if (confirm('Sur? ')) {
            /*    let result = dispatch(delete_mesure(patient.id, index));
                // dispatch(save());
                console.log(result)
                debugger;
    
                dispatch(delete_mesure_from_db(api.update_patient)).then(res => {
                    debugger;
                })*/

                delete_mesure(patient.id,index)
            }
        }
    return (
        <>


            {!error && <Component
                 handleGoBack={_ => setLocation('/search')}
                handleChange={handleChange}
                handleSubjectChange={handleSubjectChange}
                handleClickSave={handleClickSave}
                handleMesureDelete={handleMesureDelete}
                //handlePrint={handlePrint}

                handleMesureOpen={handleMesureOpen}
                handleMesureCreate={handleMesureCreate}
                data={patient}
                selectedMesureIndex={current_mesure_id}
                mesure={mesure}
            />}
           <ErrorModal/>

        </>
    )
}
