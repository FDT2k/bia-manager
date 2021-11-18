import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { compare_objects } from '@karsegard/composite-js';
import { is_nil } from '@karsegard/composite-js';
import { makeActionCreator as create, makeAsyncActionCreator as createAsync } from '@karsegard/react-redux'

import { bia_to_recap, generate_recap_header, normalize_mesure, recap_to_bar_chart, recompute } from '@/references/Mesure';
import normes, { find_norme, raw as norm_list } from '@/references/Normes';
import { normalize as normalize_patient } from '@/references/Patient';


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
const dontCommitTheseFieldsUntilSaved = ['comments', 'date']


export default (getModule) => {

    const { types, selectors, submodules } = getModule()
    const actions = {};

    const { select_mesures, select_empty_mesure, select_examinator, select_current_mesure_id, select_current_patient_id, select_result_columns, select_normes, select_edited_patient, select_report_columns, select_charts_columns, select_edited_mesure } = selectors;

    actions.real_edit_patient = create(types.EDIT_PATIENT);


    actions.added_patient = create(types.ADDED_PATIENT);
    actions.add_patient_failed = create(types.ERROR_ADD_PATIENT_UNDEF);
    actions.create_patient = createAsync(actions.add_patient_failed, actions.added_patient)


    actions.set_examinator = create(types.SET_EXAMINATOR)


    actions.refresh_norme = submodules.normes.actions.refresh_norme//create(types.REFRESH_NORME)
    actions.fetched_normes = submodules.normes.actions.fetched //create(types.FETCHED_NORMES)


    //refresh each norm
    actions.refresh_normes = () => (dispatch, getState) => {
        Object.keys(normes).map(key => {
            dispatch(actions.do_refresh_norme(key, normes[key]))
        })

    }

    /** */
    actions.do_refresh_norme = (key, norme) => (dispatch, getState) => {
        const age = select_edited_mesure(getState()).current_age;
        const patient = select_edited_patient(getState());
        let _norme = norme[patient.gender];
        const payload = {
            patient_id: patient.id,
            key,
            values: find_norme(norme, patient.gender, age)
        }
        return dispatch(actions.refresh_norme(payload));
    }

    actions.fetch_normes = () => (dispatch, getState) => {

        dispatch(actions.fetched_normes({
            normes,
            list: norm_list,
            genders: ['M', 'F']
        }));
    }

    actions.save = () => async (dispatch, getState) => {
        const patient_id = select_current_patient_id(getState());
        const mesure = select_edited_mesure(getState());
        const mesure_id = select_current_mesure_id(getState());
        return dispatch(create(types.SAVE, {
            patient_id,
            mesure,
            mesure_id

        }));
    }




    actions.set_current_mesure = create(types.SELECT_MESURE, arg => {
        return {
           
                mesure_id: arg
            
        }
    });

    actions.delete_mesure = create(types.DELETE_MESURE, (id, arg) => {
        return {
            patient_id: id,
            mesure_id: arg
        }
    })



    actions.create_mesure = () => {

        return (dispatch, getState) => {

            // debugger;
            let examinator = select_examinator(getState());
            let mesures = select_mesures(getState());
            const patient = select_edited_patient(getState());


            let new_mesure_id = mesures.length;


            let new_mesure = {
                ...select_empty_mesure(getState()),
                examinator
            }


            let { mesure } = normalize_mesure({ patient, mesure: new_mesure });


            let r = dispatch({
                type: types.CREATE_MESURE,
                payload: {
                    mesure: mesure,
                    mesure_id: new_mesure_id
                }
            })
            //   dispatch(actions.refresh_normes());
            dispatch(actions.set_current_mesure(new_mesure_id))

            return r;
        }

    };


    actions.edit_mesure = (patient_id, mesure_id) => {
        return (dispatch, getState) => {
            let mesures = select_mesures(getState());

            if (mesures.length >= mesure_id) {
                return dispatch({
                    type: types.ERROR,
                    payload: "mesure doesn't exist"
                })
            }

            const patient = select_edited_patient(getState());
            let { mesure } = normalize_mesure({ patient, mesure: mesures[mesure_id] });

            let r = dispatch({
                type: types.EDIT_MESURE,
                payload: {
                    id: patient_id,
                    mesure,
                    mesure_id
                }
            })


            dispatch(actions.reinit_fds());
            dispatch(actions.refresh_current_recap());

            return r;
        }
    };


    actions.reinit_fds = () => {
        return (dispatch, getState) => {
            const { add_mesure, clear, refresh, normes } = submodules.recap_fds.actions
            let mesures = select_mesures(getState());
            let mesure = select_edited_mesure(getState())
            const mesure_id = select_current_mesure_id(getState());

            dispatch(clear());
            mesures.slice(0, parseInt(mesure_id)).slice(-5).map(item => {
                dispatch(add_mesure(item));
            })
            dispatch(add_mesure(mesure))

            dispatch(refresh())

        }

    }

    actions.recompute_current_mesure = () => {
        return (dispatch, getState) => {

            const patient = select_edited_patient(getState()).id;
            const mesure = select_edited_mesure(getState());
            return dispatch(actions.recompute_mesure(patient, mesure));
        }
    }


    actions.recompute_mesure = (patient_id, values) => {
        return (dispatch, getState) => {
            const patient = select_edited_patient(getState());
            const bia_result_columns = select_result_columns(getState());
            const normes = select_normes(getState(), { age: values.current_age })
            const results = recompute(patient, values, bia_result_columns, normes);

            return dispatch({
                type: types.RECOMPUTE_MESURE,
                payload: {
                    id: patient_id,
                    bia: results,
                }
            })

        }
    }


    actions.change_mesure = (values, changed_field = "") => {


        return (dispatch, getState) => {
            const mesure = select_edited_mesure(getState());
            //some fields does not need to be refreshed unless saved        
            if (dontCommitTheseFieldsUntilSaved.includes(changed_field)) {
                return;
            }

            const patient = select_edited_patient(getState());
            const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure: values });

            if (changed_field === 'examinator') {
              dispatch(actions.set_examinator(values.examinator));
            }

            const new_mesure = { ...mesure, ...normalized_mesure };

            dispatch({
                type: types.CHANGE_MESURE,
                payload: {
                    id: patient.id,
                    mesure: new_mesure,
                }
            })

            if (isChangeRequireRecompute(values, mesure)) {
                dispatch(actions.recompute_current_mesure());

                dispatch(actions.refresh_current_recap());


            }

        }
    };


    actions.normalize_current_mesure = () => {
        return (dispatch, getState) => {
            const patient = select_edited_patient(getState());
            const mesure = select_edited_mesure(getState());

            dispatch(actions.change_mesure(patient, mesure));
        }
    }

    actions.change_subject = (patient_id, patient) => {


        if (is_nil(patient)) {
            return {
                type: 'GENERAL_ERROR'
            }
        }
        return (dispatch, getState) => {

            const mesure = select_edited_patient(getState());

            dispatch({
                type: types.CHANGE_SUBJECT,
                payload: {
                    id: patient_id,
                    patient: normalize_patient(patient)
                }
            })
            dispatch(actions.normalize_current_mesure());
            dispatch(actions.refresh_current_recap());
        }
    }

    actions.attempt_refresh_recap = create(types.ATTEMPT_REFRESH_RECAP)
    actions.recap_error_patient_fail = create(types.RECAP_PATIENT_NOT_LOADED)

    actions.refresh_current_recap = () => {
        return (dispatch, getState) => {
            const patient_id = select_current_patient_id(getState());
            const mesure_id = select_current_mesure_id(getState());
            dispatch(actions.refresh_recap(patient_id, mesure_id))
        }
    }

    actions.refresh_recap = (patient_id, mesure_id) => {
        return (dispatch, getState) => {

            dispatch(actions.attempt_refresh_recap({ patient_id, mesure_id }));


            if (!is_nil(patient_id) && !is_nil(mesure_id)) {

                let edited_mesure;

                let patient = select_edited_patient(getState())
                if (!patient) {
                    return dispatch(actions.recap_error_patient_fail({}))
                }
                const normes = select_normes(getState(), { age: patient.age })

                let mesures = [...patient.mesures] // NO selector here

                edited_mesure = select_edited_mesure(getState())
                let edited_mesure_id = select_current_mesure_id(getState());
                const bia_report_columns = select_report_columns(getState());
                const bia_report_chart_columns = select_charts_columns(getState());

                if (edited_mesure) { // replace edited mesure with the current edited mesure or addit if its a new one
                    if (edited_mesure_id < mesures.length) {
                        mesures = mesures.reduce((carry, item, idx) => {
                            if (idx == mesure_id) {
                                carry.push(edited_mesure)
                            } else {
                                carry.push(item);
                            }

                            return carry;

                        }, [])
                    } else {
                        mesures.push(edited_mesure);
                    }
                }




                const results = mesures.map(mesure => {

                    const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure })
                    return {
                        ...normalized_mesure,
                        bia: recompute(patient, normalized_mesure, bia_report_columns, normes)
                    }

                })


                const recap = bia_to_recap(results, bia_report_columns, normes, ['weight', 'ideal_weight', 'pct_ideal_weight', 'height']);
                const dates = generate_recap_header(mesure_id, mesures);
                const chart = recap_to_bar_chart(bia_to_recap(results, bia_report_chart_columns), dates)



                return dispatch({
                    type: types.UPDATE_RECAP,
                    payload: {
                        patient_id: patient.id,
                        headers: dates,
                        recap,
                        chart
                    }
                })
            } else {
                dispatch({ type: 'ERROR_REFRESH_RECAP' });
            }
        }

    };



    //reviewed
    actions.edit_patient = patient => {
        return (dispatch, getState) => {

            if (patient) {
                return dispatch(actions.real_edit_patient(normalize_patient(patient)));

            } else {
                return dispatch({
                    type: types.ERROR_EDIT_PATIENT_UNDEF
                });
            }

        }
    }

    actions.update_fds = values => (dispatch, getState) => {

        const mesure = select_edited_mesure(getState());
        const normes = select_normes(getState(), { age: mesure.current_age })

        dispatch(submodules.fds.actions.update({ ...values, normes }));


        dispatch(submodules.recap_fds.actions.update_mesure(select_edited_mesure(getState())))

    }






    return actions;
}



