import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import './style.scss'

const FieldSelect= props=> {
    const {label} = props;
    const {className, ...rest} = getClasseNames('field',props);
    return (
        <LayoutFlexColumn className={className}>

            <label>{label}</label>
            <select>
                <option value="test">Test</option>
            </select>
        </LayoutFlexColumn>
    )

}
export default FieldSelect;
