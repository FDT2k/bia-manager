import { enlist, identity, safe_path } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { applyModifiers, bem, compose, withBaseClass } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import SafeDatePicker from '@/bia-layout/components/Form/Editable/Date';
import EditableSelect from '@/bia-layout/components/Form/Editable/Select';
import EditableTextInput from '@/bia-layout/components/Form/Editable/TextInput';
import Field from '@/bia-layout/components/Form/Fields';
import PageHeader from '@/bia-layout/components/PageHeader';
import {LayoutFlex} from '@karsegard/react-core-layout'

import React, { useEffect } from 'react';
import './style.scss';



const [__base_class, element, modifier] = bem('patient-header')


const FieldSet = compose(
    withBaseClass(element('fieldset')),
    applyModifiers({ justBetween: true })
)(LayoutFlex)



const PatientHeader = props => {
    // console.log('patientHeader',props);
    const fields = {
        'birthdate': { type: 'date', editable: true, label: 'Date de naissance', className:'birthdate' },
        'age': { type: 'date', editable: false, label: 'Âge' },
        'gender': { type: 'select', editable: true, label: 'Sexe',options:['M','F'] },
        'usual_height': { type: 'text', editable: true, label: 'Taille' },
        'usual_weight': { type: 'text', editable: true, label: 'Poids habituel' },
        'groups.path': { type: 'select', editable: true, label: 'Groupe pathologique', options:['a','b'] },
        'mesure_count': { type: 'date', editable: false, label: 'Nombre de mesures' }
    }
    const { data, t, handleChange:handleParentChange, ...rest } = props

    useEffect(() => {
        replaceValues(data);
    }, [data])


    const onValuesChange = values => {
       // console.log(values);
       handleParentChange && handleParentChange(values);
    }

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(data, { onValuesChange,usePath:true });



    return (
        <PageHeader label={`${data.firstname} ${data.lastname}`} {...rest}>
            <FieldSet>
                {
                    enlist(fields).map(_item => {
                        const item = value(_item)
                        const field = key(_item);
                        const label = t(item.label);
                        const editable = item.editable;
                        const type = item.type;
                        const className = item.className || '';
                        const val = safe_path('',field,values);
                        const options = item.options;
                     //   console.log(label, editable, field, type, val)
                        let Component = _ => (val);
                        if (editable === true) {
                            switch (type) {
                                case 'text':
                                    Component = EditableTextInput;
                                    break;
                            }
                        }
                        return (
                            <Field key={key(_item)} label={label} className={className}>

                                {editable && type === "select" && <EditableSelect {...inputProps(field)}  options={options}/>}
                                {editable && type === "text" && <EditableTextInput value={values[field]} name={field} onChange={handleChange} />}
                                {editable && type === "date" && <SafeDatePicker 
                                    selected={values.birthdate}
                                    handleChange={handleChangeValue('birthdate')}
                                />}
                                {!editable && <div>{val}</div>}
                            </Field>
                        )
                    })
                }

            </FieldSet>

        </PageHeader>
    )
}

PatientHeader.defaultProps = {
    t: identity,
    data: {
        birthdate: '1970-01-25',
        age: '120',
        gender: 'female',
        height: '177',
        usual_weight: '70',
        'groups.12345': 'VENS2019',
        data_count: '12',
    }
}

const Component = compose(
    withBaseClass(__base_class),
    //    withModifiers(x => modifier(x), ['closed'])


)(PatientHeader)

export default Component;
