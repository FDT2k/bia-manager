import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'

const Field= props=> {
    const {label, className} = props;
    return (
        <LayoutFlexColumn className={className}>
            <label>{label}</label>
            {props.children}
        </LayoutFlexColumn>
    )

}


export const wrapField = Component => props => {
    const {label, className, ...rest} = props;
    return (<Field label={label} className={className}><Component {...rest}/></Field>)
}


export default withBaseClass('field')(Field);
