import React, { useEffect, useState } from 'react';

import FormulaHeaderSelect from '../FormulaHeaderSelect'
import { useTranslation } from '@';


export default props => {
    const{t} =useTranslation();
    const { available_columns, columns, handleChange, selectable, ...rest } = props;

    let colByName = available_columns.reduce(function (carry, item) {
        carry[item['name']] = item;
        return carry;
    }, {})
    return (<>
        <div></div>
        {columns.map((col, idx) => {
            return (

                <div key={idx} className="row header">{
                    selectable[idx] === true ? <FormulaHeaderSelect idx={idx} handleChange={handleChange} defaultValue={col} options={available_columns} disabled_col={columns} /> : colByName[col].label
                }</div>

            )

        })}
    </>);
}
