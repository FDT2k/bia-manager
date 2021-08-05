import React from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, cEx } from 'bia-layout/utils'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex';
import './style.scss';

import {enlist} from '@karsegard/composite-js'
import {key,value} from '@karsegard/composite-js/ObjectUtils'

const [__base_class,element,modifier] = bem ('patient-header')


const FieldSet = compose(
        withBaseClass(element('fieldset')),
        applyModifiers({justBetween:true})
    )(LayoutFlex)


const Field = withBaseClass(element('field'))(LayoutFlexColumn)

const PatientHeader = props => {
   // console.log('patientHeader',props);
    const fields = {
        'birthdate': 'Date de naissance',
        'age': 'Âge',
        'gender': 'Sexe',
        'usual_height': 'Taille',
        'usual_weight': 'Poids habituel',
        'groups.path': 'Groupe pathologique',
        'data_count': 'Nombre de mesures'
    }
    const {data,t, ...rest} = props
    return(
        <LayoutFlexColumn {...rest}>
            <h1>{data.firstname} {data.lastname}</h1>
            <FieldSet>
                {
                    enlist(fields).map( item => {

                            return (
                                <Field key={key(item)}>
                                    <b>{t(value(item))}</b>
                                    {data[key(item)]}
                                </Field>
                            )
                    })
                }

            </FieldSet>

        </LayoutFlexColumn>
    )
}

PatientHeader.defaultProps = {
    t:x=>x,
    data:{
        birthdate:'1970-01-25',
        age:'120',
        gender:'female',
        height:'177',
        usual_weight:'70',
        'groups.12345':'VENS2019',
        data_count:'12',
    }
}

const Component = compose(
    withBaseClass(__base_class),
    //    withModifiers(x => modifier(x), ['closed'])


)(PatientHeader)

export default Component;
