import { is_nil, safe_path } from '@karsegard/composite-js';
//import { useKeypress } from '@karsegard/react-hooks';

import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useLocation, useRoute } from "wouter";
import ErrorModal from '@/App/BIA/Features/Editor/ErrorModal';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { compare_objects } from '@karsegard/composite-js';

export default Component => props => {
    const [location, setLocation] = useLocation();
    const componentRef = useRef();

    const { patient_id, mesure_id } = props.params;

    const { patient, mesure, current_mesure_id, error, err_message } = props;
    const { populate_sportrate, populate_sporttype, populate_machines, fetch_normes } = props;
    const { edit_patient, edit_mesure, create_mesure, change_mesure, refresh_recap,recompute_current_mesure, change_subject, update_patient, save, delete_mesure, set_examinator } = props;

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
                recompute_current_mesure();
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

    const dontCommitTheseFields = ['comments', 'date']


    const isChangeRequireRecompute = (values,mesure)=> {

        const [d1,_] = spreadObjectPresentIn(['rea50','res50','z50','a50'],values.data)
        const [d2,__] = spreadObjectPresentIn(['rea50','res50','z50','a50'],mesure.data)
        if(!compare_objects(d1,d2)){
            return true
        }

        const [o1,___] = spreadObjectPresentIn(['height','weight','bmi_ref'],values)
        const [o2,____] = spreadObjectPresentIn(['height','weight','bmi_ref'],mesure)
        
        if(!compare_objects(o1,o2)){
            return true
        }
        return false;
    }

    const handleChange = (values, changed_field) => {
        console.log('form changed', values, changed_field);

        if (changed_field === 'examinator') {
            set_examinator(values.examinator);
        }
        

        if (dontCommitTheseFields.includes(changed_field)) {
            return;
        }

        change_mesure(patient, values)


        if(isChangeRequireRecompute (values,mesure)){
            recompute_current_mesure();
            if (values.data && patient) {
                //  dispatch(recompute_mesure(patient_id, values));
                refresh_recap(patient_id, current_mesure_id);
            }
        }

   
    }

    const handleSubjectChange = values => {
        change_subject(patient_id, values);
    }


    const handleClickSave = _ => {
        save()
            // .then(_=>update_patient(patient.id, patient, mesure, current_mesure_id))
            .then(res => {
                if (current_mesure_id <= patient.mesures.length) {
                    setLocation(`/editor/${patient_id}/${current_mesure_id}`);
                }
            })

    }

    const handleMesureDelete = index => {
        if (confirm('Etes vous sur de vouloir supprimer cette mesure ?')) {
            delete_mesure(patient.id, index)
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
                handleMesureOpen={handleMesureOpen}
                handleMesureCreate={handleMesureCreate}
                data={patient}
                selectedMesureIndex={current_mesure_id}
                mesure={mesure}
            />}
            <ErrorModal />

        </>
    )
}
