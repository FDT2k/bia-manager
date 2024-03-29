import { bem, cEx, getClasseNames } from '@karsegard/react-compose';
import Tooltip from '@/bia-layout/hoc/Tooltip';
import {Grid} from '@karsegard/react-core-layout'
import React, { useEffect, useState } from 'react';

import FormulaResultHeader from './FormulaResultHeader'
import FormulaResultRow from './FormulaResultRow'



export const Component = props => {


    const { data, t, available_columns, selectable, columns, ...rest } = props;
    const [state, setState] = useState(columns);
   
    useEffect(()=>{
        setState(columns);
    },[columns])

    const handleChange = (idx, value) => {

        setState(state => {
            let newState = [...state];
            newState[idx] = value
            return newState;
        })

    }
    return (
        <Grid className="comparison-grid" style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gridAutoRows: "1fr"
        }}>
            <FormulaResultHeader available_columns={available_columns} handleChange={handleChange} selectable={selectable} columns={state} />

            {data.filter(item => item.display == true).map((item, idx) =>
                <FormulaResultRow key={idx} available_columns={available_columns} label={item.label} values={item.values} logs={item.logs} columns={state} limits={item.limits} />

            )}

        </Grid>


    )
}

Component.defaultProps = {
    data: [],
    available_columns: [
        { name: 'kushner', label: 'Kushner', selectable: true },
        { name: 'segal', label: 'Segal', selectable: true },
        { name: 'norme', label: 'Norme', type: 'norme', selectable: false },
        { name: 'gva', label: 'Gva', selectable: true },
    ],
    columns: ['norme', 'kushner', 'gva'],
    selectable: [false, true, true],
    t: x => x
}
export default Component;