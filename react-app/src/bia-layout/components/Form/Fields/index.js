import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'
import LayoutFlex,{ LayoutFlexColumn} from 'bia-layout/layouts/Flex'

import './style.scss'


const [__base_class,element,modifer] = bem('field');

const Field= props=> {
    const {label, className} = props;
    return (
        <LayoutFlexColumn className={className}>
            <label className={element('label')}>{label}</label>
            <div className={element('field')}>{props.children}</div>
        </LayoutFlexColumn>
    )

}


export const wrapField = Component => props => {
    const {label, className, ...rest} = props;
    return (<Field label={label} className={className}><Component {...rest}/></Field>)
}


export default withBaseClass(__base_class)(Field);
