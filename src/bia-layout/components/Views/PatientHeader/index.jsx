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
                    <b>Date de naissance</b>
                    18.03.1992
                </Field>
                <Field>
                    <b>Âge</b>
                    31
                </Field>
                <Field>
                    <b>Sexe</b>
                    féminin
                </Field>
                <Field>
                    <b>Taille</b>
                    168cm
                </Field>
                <Field>
                    <b>Poids habituel</b>
                    93.2kg
                </Field>
                <Field>
                    <b>Groupe pathologique</b>
                    VNS2021
                </Field>
                <Field>
                    <b>Nombre de mesures</b>
                    0
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
