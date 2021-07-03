import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import './style.scss'

const Field= props=> {
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
