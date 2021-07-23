import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import './style.scss'

const FieldSelect= props=> {
    const {label} = props;
    return (
        <LayoutFlexColumn>
            <label>{label}</label>
            <select>
                <option value="test">Test</option>
            </select>
        </LayoutFlexColumn>
    )

}
export default FieldSelect;
