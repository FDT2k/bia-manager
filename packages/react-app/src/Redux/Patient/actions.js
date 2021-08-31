import createAction from '@/Redux/utils/make-action';
import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';
import { normalize as normalize_subject } from '@/references/Patient';

export const ACTIONS_TYPES = createActionTypes(
    'CREATE',
    'CHANGE',
    'SAVE',
    'RESET'
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};

    const {select_empty_subject,select_subject_form} = selectors;

    actions.create_subject = ()=> {
        return (dispatch,getState)=>{
            dispatch({type:action_types.CREATE})
            const subject = select_empty_subject(getState());

            return dispatch(actions.edit_subject(subject));
        }
    }


    actions.edit_subject = values => {
        return (dispatch,getState)=>{
            const patient = normalize_subject(select_subject_form(getState()));
            return dispatch(createAction(action_types.CHANGE,{...patient,...values}));
        }
    }


    return actions;
}



