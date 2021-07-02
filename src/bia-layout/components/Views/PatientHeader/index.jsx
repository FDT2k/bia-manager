import React from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, cEx } from 'bia-layout/utils'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex';
import './style.scss';

const [__base_class,element,modifier] = bem ('patient-header')


const FieldSet = compose(
        withBaseClass(element('fieldset')),
        applyModifiers({justBetween:true})
    )(LayoutFlex)


const Field = withBaseClass(element('field'))(LayoutFlexColumn)


const PatientHeader =Element=> props => {

    return(
        <Element {...props}>
            <h1> Céline Bellefeuille </h1>
            <FieldSet>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
                <Field>
                    <b>test</b>
                    field 1
                </Field>
            </FieldSet>

        </Element>
    )
}



const Component = compose(
    withBaseClass(__base_class),
    //    withModifiers(x => modifier(x), ['closed'])
    PatientHeader,

)(LayoutFlexColumn)

export default Component;
