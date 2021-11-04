import { updateList, updateProp } from '@/Redux/utils/handlers';
import { reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';

/**

actions.recompute_mesure = (patient_id, values) => {
    return (dispatch, getState) => {
        const patient = select_edited_patient(getState());
        const bia_result_columns = select_result_columns(getState());
        const normes = select_normes(getState(),{age:values.current_age})
        const results = recompute(patient, values, bia_result_columns, normes);

        return dispatch({
            type: action_types.RECOMPUTE_MESURE,
            payload: {
                id: patient_id,
                bia: results,
            }
        })

    }
}
*/

export default (getModule) => {

    const { submodules, types, plugins,modplugin:{getReducers} } = getModule()


    const module = {};

    console.log(plugins)


    module.reducer = (state = {}, action) => {


        switch (action.type) {

            case types.EDIT_MESURE:
                return {
                    mesure: {

                        ...action.payload.mesure,

                        fds: submodules.fds.reducer(action.payload.mesure.fds, action)
                    }
                }


            case types.CHANGE_MESURE:
                return {
                    mesure: {
                        ...state.mesure,
                        ...action.payload.mesure,
                        last_update: new Date()

                    }
                }

            case types.RECOMPUTE_MESURE:
                return {
                    mesure: {
                        ...state.mesure,
                        bia: [...action.payload.bia]
                    }
                }

            case types.CREATE_MESURE:
                return {
                    mesure: {
                        ...action.payload.mesure
                    }
                }

        }

        //plugins should flow through here
        return {

            ...state,
            ...getReducers(plugins,state,action)
        };
    }




    return module;
}