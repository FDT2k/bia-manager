import React, { useMemo, useState, forwardRef, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFieldValues, useKeypress, useFocus } from '@karsegard/react-hooks';


import { bem, compose, withModifiers, applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'


import LayoutFlex, { LayoutFlexColumn } from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import Field from 'bia-layout/components/Form/Fields'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import { Save, Print, Stats } from 'bia-layout/components/Icons';

import ElectricalDataForm from 'bia-layout/views/ElectricalDataForm';
import { bmi, ideal_weight } from 'references';
import Input from 'bia-layout/components/Form/Input'
import ToggleEditField from 'bia-layout/hoc/ToggleEdit'


import './style.scss'
import "react-datepicker/dist/react-datepicker.css";
import { is_nil } from '@karsegard/composite-js';


const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
    </div>
));



const Editable = props => {

    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    useEffect(() => {
        if (ref.current && enterPressed && hasFocus) {
            setEditable(false);
        }
    }, [enterPressed, hasFocus])


    useEffect(() => {
        if (editable && ref.current) {
            ref.current.focus();
        }
    }, [editable])

    return (<>
        {editable && <input ref={ref} onBlur={_ => setEditable(false)} type="text" {...props} />}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.value}</div>}
    </>
    )

}

const EditableTextInput = withBaseClass('editable-field')(Editable)


const SafeDatePicker = ({date,handleChange}) => {

    let val = date;

    if(is_nil(date)){

        val= new Date();
        
    }
    
    if( ! (val instanceof Date)){
        val = new Date(val);
        
    }

    
    return (
        <DatePicker
        selected={val}
        onChange={handleChange}
        customInput={<CustomInput tabindex="-1" />}
    />
    )
}

const [__base_class, element, modifier] = bem('bia-mesure-editor')

const Editor = props => {

    const { className, gender, t, handleGoBack, mesure, ...rest } = getClasseNames(__base_class, props)

    const { values, handleChangeValue, inputProps, handleChange, assignValues,replaceValues } = useFieldValues(mesure);
 //   const { values:electricalValues, handleChange:electricalHandleChange,replaceValues: replaceElectricalValues } = useFieldValues(mesure.data);

    

    useEffect(() => {
        console.log('reloading',mesure);
        
       assignValues(mesure);
 //      replaceElectricalValues(mesure.data);
    }, [mesure]);

/*
    useEffect(() => {
        assignValues({data:electricalValues})        
    }, [electricalValues]);
*/


    
    const [editedGroup, setEditedGroup] = useState("a");
    const electricalHandleChange = e => {
        
        replaceValues ( values => {

            let newState= {
                ...values,
                data:{
                    ...values.data,
                    [e.target.name]:e.target.value
                }
            }
            return newState;
        })

    }

    const electricalHandleValues = new_values => {
        
        replaceValues ( values => {

            let newState= {
                ...values,
                data:{
                    ...values.data,
                    ...new_values
                }
            }
            return newState;
        })

    }


    useEffect(() => {
        if (!is_nil(values.weight) && !is_nil(values.height)) {
            assignValues({
                bmi: bmi(values.weight, values.height),
                ideal_weight: ideal_weight(gender, values.height)
            });
        }

    }, [values.weight, values.height, gender]);

    const handleGroupChange = g => {
        setEditedGroup(g)
    }

    return (
        <LayoutFlex {...rest} className={className}>
            <LayoutFlexColumn>

                <LayoutFlex wrap >
                    <Field label={t("Date d'Examen")}>
                        <SafeDatePicker
                            selected={values.date}
                            handleChange={handleChangeValue('date')}
                        />
                    </Field>

                    <Field label={t("Activité physique")}>
                        <select>

                            <option>abcd</option>
                        </select>

                    </Field>
                    <Field label={t("Type d'Activité physique")}>
                        <select>

                            <option>abcd</option>
                        </select>

                    </Field>
                    <Field label={t("Fumeur")}>
                        <ToggleSwitch id="smoker" labelYes="Oui" labelNo="Non" name="smoker" onChange={handleChange} checked={values.smoker} />
                    </Field>
                    <Field label={t("Coté mesuré")}>
                        <ToggleSwitch labelYes="Gauche" labelNo="Droit" name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
                    </Field>
                    <Field label={t("Poids Actuel")} >
                        <input type="text" {...inputProps('weight')} />

                    </Field>
                    <Field label={t("Taille cm")}  >
                        <input type="text" {...inputProps('height')} />
                    </Field>

                </LayoutFlex>
                <Container fit grow>
                    <ElectricalDataForm handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />
                </Container>

                <Container fit grow>
                    <Grid style={{
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        gridAutoRows: "1fr"
                    }}>
                        <div></div>
                        <div className="row header">50khz</div>
                        <div className="row header">Geneva</div>
                        <div className="row header">Norme</div>

                        <div className="row header">%Eau corporelle</div>
                        <div>10</div>
                        <div>20</div>
                        <div>39</div>

                        <div className="row header">Masse Maigre</div>
                        <div>10</div>
                        <div>20</div>
                        <div>39</div>

                        <div className="row header">%Masse Maigre</div>
                        <div>10</div>
                        <div>20</div>
                        <div>39</div>
                        <div className="row header">%Masse Maigre</div>

                        <div>10</div>
                        <div>20</div>
                        <div>39</div>
                        <div className="row header">%Masse Maigre</div>

                        <div>10</div>
                        <div>20</div>
                        <div>20</div>
                    
                    </Grid>
                </Container>

            </LayoutFlexColumn>
            <LayoutFlexColumn>
                <Field label={t("Examinateur")}>
                    <EditableTextInput value={values.examinator} name="examinator" onChange={handleChange} />
                </Field>
                <Field label={t("BioImpédanceMètre")}>
                    <div>{values.machine}</div>

                </Field>
                <Field label={t("BMI Reference")}>

                    <EditableTextInput value={values.bmi_ref} name="bmi_ref" onChange={handleChange} />
                </Field>
                <Field label={t("Poids Idéal")}>
                    <div>{values.ideal_weight}</div>
                </Field>
                <Field label={t("BMI Actuel")}>
                    <div>{values.bmi}</div>
                </Field>
                <Field label={t("Remarques / Interprétations")}>
                    <EditableTextInput value={values.comments} name="comments" onChange={handleChange} />
                </Field>
                <LayoutFlex justBetween>
                    <button><Save /></button>
                    <button><Print /></button>
                    <button><Stats /></button>
                </LayoutFlex>
            </LayoutFlexColumn>
        </LayoutFlex>
    )

}



Editor.defaultProps = {
    mesure: {
        date: new Date(),
        left_side: false,
        weight: null,
        height: null,
        bmi_ref: null,
        smoker: false,
        comments: null,
        examinator: null,
        machine: null

    },
    gender: 'm',
    t: x => x
}




export default (Editor);
