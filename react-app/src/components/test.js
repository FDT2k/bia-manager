import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {actions} from 'Stores/Manager'
export default props => {
    const dispatch = useDispatch();
    console.log(actions);
    return(

        <>
        <button onClick={_=>dispatch(actions.create('yey'))}>add</button>
        </>
    )

}