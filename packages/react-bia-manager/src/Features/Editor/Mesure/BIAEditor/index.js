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
    const {onValuesChange,data} = props

    const {values,handleChangeValue,inputProps,replaceValues,handleChange} = useFieldValues(data,{usePath:true,onValuesChange})

    useEffect(()=>{
        
        replaceValues(data)
    },[data])


    const electricalHandleChange = e => {

      
        handleChangeValue(`data.${e.target.name}`,e.target.value)
    }

    const electricalHandleValues = new_values => {

        replaceValues(values => {

            let newState = {
                ...values,
                data: {
                    ...values.data,
                    ...new_values
                }
            }
            return newState;
        })

    }


    const handleGroupChange = g => {
        setEditedGroup(g)
    }

    return (<LayoutFlexColumn>
        <LayoutFlex wrap >
            <Field className="date-examen" label={t("Date d'Examen")}>
                <SafeDatePicker
                    selected={values.date}
                    handleChange={handleChangeValue('date')}
                />
            </Field>
            <Field className="activite-physique" label={t("Activité physique")}>
                <Select tabIndex={2}  {...inputProps('sport.rate')} options={safe_path([], 'physical_activity_rate', lists)} />

            </Field>
            <Field className="type-activite-physique" label={t("Type d'Activité physique")}>
                <Select tabIndex={2}  {...inputProps('sport.type')} options={safe_path([], 'physical_activity_type', lists)} />

            </Field>
            <Field className="fumeur" label={t("Fumeur")}>
                <ToggleSwitch tabIndex={3} id="smoker" labelYes="Oui" labelNo="Non" name="smoker" onChange={handleChange} checked={values.smoker} />
            </Field>
            <Field className="taille" label={t("Taille (cm)")}  >
                <input type="text" tabIndex={4}  {...inputProps('height')} />
            </Field>
            <Field className="poids-actuel" label={t("Poids Actuel (kg)")} >
                <input type="text" tabIndex={5}  {...inputProps('weight')} />
            </Field>
            <Field className="cote-mesure" label={t("Coté mesuré")}>
                <ToggleSwitch tabIndex={6} labelYes="Gauche" labelNo="Droit" name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
            </Field>
        </LayoutFlex>
        <Container fit grow>
            <ElectricalDataForm tabIndexOffset={7} handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />
        </Container>
        
    </LayoutFlexColumn>)
}



export default Component;