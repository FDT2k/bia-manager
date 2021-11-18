import React from 'react';
import { store } from '@/Store';
import ReduxModule from '@/Redux/ErrorHandler';
import {ErrorMessage} from '@karsegard/react-bia-manager'
import {useDispatch,useSelector} from '@karsegard/react-redux'
import { is_empty } from '@karsegard/composite-js';




export const Module = ReduxModule(state => state.errors, 'errors', {});
export const { actions, selectors } = Module;
store.manager.addModule(Module);




export default props => {
    const dispatch = useDispatch();
    const current_error = useSelector(selectors.current_error);

    debugger;

    return (<>
        {!is_empty(current_error) && <ErrorMessage 
                                        error={current_error} 
                                            
                                        dismiss={_=>dispatch(actions.dismiss())}
                                        />}
        </>)
}