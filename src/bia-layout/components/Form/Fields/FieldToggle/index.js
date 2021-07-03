import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import './style.scss'



const FieldToggle= props=> {
    const {label,labelYes,labelNo, id} = props;
    const {className, ...rest} = getClasseNames('field',props);

    return (
        <LayoutFlexColumn className={className}>
            <label>{label}</label>
            <ToggleSwitch labelYes={labelYes} labelNo={labelNo} id={id}/>
        </LayoutFlexColumn>
    )

}

export default FieldToggle;
