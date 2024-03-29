import React,{useEffect, useState} from 'react'
import SafeDatePicker from '@/Components/Form/Editable/Date';
import Select from '@/Components/Form/Select';
import { safe_path } from '@karsegard/composite-js'

import ElectricalDataForm from '@/Components/ElectricalDataForm';
import ToggleSwitch from '@/Components/Form/ToggleSwitch';
import { Container, LayoutFlex, LayoutFlexColumn, withGridArea } from '@karsegard/react-core-layout'
import Field from '@/Components/Form/Fields';

import { useCustomList, useTranslation } from '@'
import { useFieldValues } from '@karsegard/react-hooks';

export const Component = props => {
    const {t}= useTranslation();
    const [editedGroup, setEditedGroup] = useState("a");

    const {lists,forms} = useCustomList();
    const {onValuesChange,data,normes} = props
    const {values,handleChangeValue,inputProps,replaceValues,handleChange} = useFieldValues(data,{usePath:true,onValuesChange})

    useEffect(()=>{

        replaceValues(data)
    },[data])


    const electricalHandleChange = e => {

        debugger;

        handleChangeValue(`data.${e.target.name}`,e.target.value)
    }

    const electricalHandleValues = new_values => {
        debugger;
        replaceValues(values => {

            let newState = {
                ...values,
                data: {
                    ...values.data,
                    ...new_values
                }
            }
            onValuesChange(newState)

            return newState;
        })
       // handleChangeValue(`data.${e.target.name}`,e.target.value)
    }
    

    const handleGroupChange = g => {
        setEditedGroup(g)
    }

    let norme = (normes && normes['alpha']) ? normes['alpha'].join('-') : undefined
    return (<LayoutFlexColumn>
        <LayoutFlex wrap style={{gap:'16px'}}>
            <Field className="date-examen" label={t("Exam Date//editor field")}>
                <SafeDatePicker
                    selected={values.date}
                    handleChange={handleChangeValue('date')}
                />
            </Field>
            <Field className="activite-physique" label={t('Physical Activity//editor field')}>
                <Select tabIndex={2}  autoFocus {...inputProps('sport.rate')} options={safe_path([], 'physical_activity_rate', lists)} />

            </Field>
            <Field className="type-activite-physique" label={t('Physical Activity Category//editor field')}>
                <Select tabIndex={2}  {...inputProps('sport.type')} options={safe_path([], 'physical_activity_type', lists)} />

            </Field>
            <Field className="fumeur" label={t('Smoker//editor field')}>
                <ToggleSwitch tabIndex={3} id="smoker" labelYes={t('Yes//smoker checkbox')} labelNo={t('No//smoker checkbox')} name="smoker" onChange={handleChange} checked={values.smoker} />
            </Field>
            <Field className="taille" label={t("Height (cm)//editor field")}  >
                <input type="text" tabIndex={4}  {...inputProps('height')} />
            </Field>
            <Field className="poids-actuel" label={t("Current weight (kg)//editor field")} >
                <input type="text" tabIndex={5}  {...inputProps('weight')} />
            </Field>
            <Field className="cote-mesure" label={t("Measurement side//editor field")}>
                <ToggleSwitch tabIndex={6} labelYes={t('Left//Measurement side checkbox')} labelNo={t('Right//Measurement side checkbox')} name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
            </Field>
        </LayoutFlex>
        <Container fit grow>
            <ElectricalDataForm tabIndexOffset={7} norme={norme} handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />
        </Container>

    </LayoutFlexColumn>)
}



export default Component;
