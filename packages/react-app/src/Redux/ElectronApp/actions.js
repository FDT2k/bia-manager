import createAsync from '@/Redux/utils/async-dispatch'
import create from '@/Redux/utils/make-action'

export default (getModule) => {

    const { action_types, selectors } = getModule()


    const actions = {};

  //  const {select_empty_subject,select_subject_form} = selectors;

   /* actions.create_subject = ()=> {
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
*/

    const openFileFails = create(action_types.OPEN_FILE_FAILS);
    const openFileSuccess = create(action_types.OPEN_FILE_SUCCESS,arg => {
        const {content,...rest} = arg;
        return rest;
    });


    actions.start_loading = create(action_types.LOADING);
    actions.stop_loading = create(action_types.LOADING_DONE);

    actions.open_file = createAsync(openFileFails,openFileSuccess);
    actions.save_file = promise => {
        
    }

    return actions;
}



