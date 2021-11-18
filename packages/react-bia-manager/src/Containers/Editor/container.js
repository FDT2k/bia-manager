import { is_nil, safe_path, is_empty } from '@karsegard/composite-js';

import React, { useEffect, useRef, useState } from 'react';

import { useLocation, useRoute } from "wouter";
import ErrorModal from '@/App/BIA/Features/Editor/ErrorModal';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { compare_objects } from '@karsegard/composite-js';
import { useInterval,useIntervalState } from '@karsegard/react-hooks';
import ReactLoading from 'react-loading';
import { LayoutFlex } from '@karsegard/react-core-layout';

const RightFooter = props => {
    const { is_file_saving, last_diff, last_saved } = props;

    return (<i>
        {is_file_saving ? <LayoutFlex alignCenter><ReactLoading width={24} height={24} type="spin" color="#FFFFFF"/> &nbsp;sauvegarde en cours</LayoutFlex> : ''}
        {!is_file_saving && !is_empty(last_saved) ? 'dernière sauvegarde: ' + last_saved + ' ' : ''}
        {!is_file_saving && !is_empty(last_diff) ? '(' + last_diff + ')' : ''}
    </i>)
}

export default Component => props => {
    const [location, setLocation] = useLocation();
    const componentRef = useRef();

    //const [last_diff, setDiff] = useState();
    const { patient_id, mesure_id } = props.params;

    const { patient, mesure, current_mesure_id, error, err_message } = props;
    const { fetch_normes } = props;
    const { edit_patient, edit_mesure, create_mesure, change_mesure, refresh_recap, recompute_current_mesure, change_subject, update_patient, save, delete_mesure, set_examinator, last_saved_diff, current_mesures, last_saved, is_file_saving } = props;



    const [last_diff, setDiff]  = useIntervalState('',last_saved_diff, 60*1000)
    useEffect(()=>{
        setDiff(last_saved_diff())
    },[last_saved])

   


    useEffect(() => {
       
        fetch_normes()
    }, []);




    //We load patient from the currently setted patient_id if not already loaded

    useEffect(() => {
        //   console.log('patient changed?',patient_id)
        if (!is_nil(patient_id) && ((patient && patient_id != patient.id) || !patient)) {
           
            edit_patient(patient_id);
        }
    }, [patient_id]);




    useEffect(() => {

        if (!is_nil(patient)) {
            if (!is_nil(mesure_id) && mesure_id < current_mesures.length) {
                edit_mesure(patient_id, mesure_id);
                recompute_current_mesure();
            } else {
                
                create_mesure(patient_id)
            }

        }
    }, [mesure_id, patient]);



    const new_mesure = patient_id => {
        return Promise.resolve(create_mesure(patient_id));
    }

    const handleMesureOpen = (value, idx) => {
        if (idx < current_mesures.length) {
            setLocation(`/editor/${patient_id}/${idx}`);
        } else {
            setLocation(`/editor/${patient_id}`);
        }
    }

    const handleMesureCreate = _ => {
        setLocation(`/editor/${patient_id}`);

    }

    const dontCommitTheseFields = ['comments', 'date']


    const isChangeRequireRecompute = (values, mesure) => {

        const [d1, _] = spreadObjectPresentIn(['rea50', 'res50', 'z50', 'a50'], values.data)
        const [d2, __] = spreadObjectPresentIn(['rea50', 'res50', 'z50', 'a50'], mesure.data)
        if (!compare_objects(d1, d2)) {
            return true
        }

        const [o1, ___] = spreadObjectPresentIn(['height', 'weight', 'bmi_ref'], values)
        const [o2, ____] = spreadObjectPresentIn(['height', 'weight', 'bmi_ref'], mesure)

        if (!compare_objects(o1, o2)) {
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


        if (isChangeRequireRecompute(values, mesure)) {
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
                if (current_mesure_id <= current_mesures.length) {
                    setLocation(`/editor/${patient_id}/${current_mesure_id}`);
                }
            })

    }

    const handleMesureDelete = index => {
        if (confirm('Etes vous sur de vouloir supprimer cette mesure ?')) {
            delete_mesure(patient.id, index)
        }
    }

    const handleGoBack = _ => setLocation('/search')
    const handlers = {
        handleChange,
        handleSubjectChange,
        handleClickSave,
        handleMesureDelete,
        handleMesureOpen,
        handleMesureCreate,
        handleGoBack
    }

    return (
        <>


            {!error && <Component
                RightFooter={<RightFooter  is_file_saving={is_file_saving} last_saved={last_saved} last_diff={last_diff} />}

                handlers={handlers}
               
                data={patient}
                selectedMesureIndex={current_mesure_id}
                mesure={mesure}
            />}
            <ErrorModal />

        </>
    )
}
