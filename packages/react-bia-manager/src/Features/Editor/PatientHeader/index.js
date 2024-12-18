import { enlist, identity, safe_path } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { applyModifiers, bem, compose, withBaseClass } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import SafeDatePicker from '@/Components/Form/Editable/Date';
import EditableSelect from '@/Components/Form/Editable/Select';
import EditableTextInput from '@/Components/Form/Editable/TextInput';
import Field from '@/Components/Form/Fields';
import PageHeader from '@/Components/PageHeader';
import {LayoutFlex} from '@karsegard/react-core-layout'

import React, { useEffect,useState ,useMemo} from 'react';
import {useCustomList,useTranslation} from '@'



const [__base_class, element, modifier] = bem('patient-header')


const FieldSet = compose(
    withBaseClass(element('fieldset')),
    applyModifiers({ justBetween: true })
)(LayoutFlex)


const NameForm = props => {
    const {data} = props;

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(data, { usePath:true });

    return (
        <LayoutFlex>
            <Field label="Prénom">
                <input type="text" {...inputProps('firstname')}/>
            </Field>
            <Field label="Nom">
                <input type="text" {...inputProps('lastname')}/>
            </Field>
        </LayoutFlex>
    )
}


const PatientHeader = props => {
    // console.log('patientHeader',props);

    const { data, refresh_editor_lists, handleChange:handleParentChange,custom_lists,handleAction,actions ,...rest } = props

    const {className} = rest;


    const {lists} = useCustomList();

    const {t} = useTranslation();

    const fields = {
        'birthdate': { type: 'date', editable: true, label: t('Date of birth'), className:'birthdate' },
        'age': { type: 'text', editable: false, label:  t('Age') },
        'gender': { type: 'select', editable: true, label:  t('Sex'),options:safe_path([],'genders',lists) },
        'usual_height': { type: 'text', editable: true, label:  t('Height (cm)') },
        'usual_weight': { type: 'text', editable: true, label:  t('Usual weight (kg)') },
        'groups.patho': { type: 'select', editable: true, label:  t('Pathological Group'), options:safe_path([],'pathological_groups',lists)},
        'groups.ethno': { type: 'select', editable: true, label:  t('Ethnic group'), options:safe_path([],'ethnological_groups',lists)},
        'mesure_count': { type: 'text', editable: false, label:  t('Number of measurements') }
    }
    useEffect(() => {
        replaceValues(data);
    }, [data])



    const onValuesChange = values => {
       handleParentChange && handleParentChange(values);
    }

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(data, { onValuesChange,usePath:true });

    const label = useMemo(()=>{ 
         return `${data.firstname} ${data.lastname}`
       
        },[data])

   

    
    return (
        <PageHeader label={label} handleAction={handleAction} actions={actions} className={className}>
            <FieldSet>
               
                {
                    enlist(fields).map(_item => {
                        const item = value(_item)
                        const field = key(_item);
                        const label = item.label;
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
                                {editable && type === "text" && <EditableTextInput {...inputProps(field)}/>}
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
    data: {
        birthdate: '1970-01-25',
        age: '120',
        gender: '',
        height: '177',
        usual_weight: '70',
        mesure_count: '999',
    }
}

const Component = compose(
    withBaseClass(__base_class),
    //    withModifiers(x => modifier(x), ['closed'])


)(PatientHeader)

export default Component;
