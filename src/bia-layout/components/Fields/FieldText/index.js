import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import './style.scss'


const FieldText= props=> {
    const {label} = props;

    return (
        <LayoutFlexColumn>
            <label>{label}</label>
            <input type="text"/>
        </LayoutFlexColumn>
    )

}

export default FieldText;
