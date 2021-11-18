import React from 'react';
import { store } from '@/Store';
import ReduxModule from '@/Redux/Loading';
import { Loading } from '@karsegard/react-bia-manager'
import { useDispatch, useSelector } from '@karsegard/react-redux'
import { is_empty } from '@karsegard/composite-js';




export const Module = ReduxModule(state => state.loading, 'loading', {});
export const { actions, selectors } = Module;
store.manager.addModule(Module);




export default props => {
    const dispatch = useDispatch();
    const is_loading = useSelector(selectors.is_loading);
    const message = useSelector(selectors.message);
    debugger;
    return (<>
        <Loading visible={is_loading}
            message={message}


        />
    </>)
}