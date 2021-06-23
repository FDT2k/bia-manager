import React from 'react';

import {add,del,selectDatabases } from 'Stores/Databases';
import { useSelector, useDispatch } from 'react-redux';
import {Delete} from 'components/Icons';
import Fullscreen from 'bia-layout/containers/Fullscreen'

export default props => {

    const dispatch = useDispatch();
    const databases = useSelector(selectDatabases);
    const _add = _=> {
        dispatch(add('test'))
    };
    return (
        <Fullscreen>
            <h1> Database selection</h1>
            <div>

                {
                    databases.map(item=> {
                        return <li key={item.uid}>{item.name}  <button onClick={_=>  dispatch(del({uid:item.uid}))}><Delete/></button></li>
                    })
                }
                <button onClick={_add}>add</button>
                <button >créer</button>

            </div>
        </Fullscreen>
    )
}