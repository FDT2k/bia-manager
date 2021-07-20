import React, { useMemo, useState, forwardRef } from 'react';
import { bem, compose, withModifiers, applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import LayoutFlex, { LayoutFlexColumn } from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import FieldText from 'bia-layout/components/Form/Fields/FieldText'
import Field from 'bia-layout/components/Form/Fields'
import FieldSelect from 'bia-layout/components/Form/Fields/FieldSelect'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import { ComponentWithArea as Area, withGridArea } from 'bia-layout/hoc/grid/Area'
import { Save, Print, Stats } from 'bia-layout/components/Icons';
import DatePicker from 'react-datepicker';
import { useFieldValues } from '@karsegard/react-hooks';
import ElectricalDataForm from 'bia-layout/views/ElectricalDataForm';
import './style.scss'
import "react-datepicker/dist/react-datepicker.css";

const ContainerWithArea = withGridArea(Container);


const [__base_class, element, modifier] = bem('bia-editor')

const ListItem = applyModifiers({ 'alignCenter': true, 'justBetween': true })(LayoutFlex);

const NavComponent = compose(
    applyModifiers({ 'alignCenter': true }),
    withGridArea
)(LayoutFlex);
const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
    </div>
));


const Editor = props => {

    const { className, t, handleGoBack, mesure, ...rest } = getClasseNames(__base_class, props);

    const { values, handleChangeValue, inputProps, handleChange } = useFieldValues(mesure);


    return (
        <LayoutFlex {...rest}>
            <LayoutFlexColumn>
                <LayoutFlex wrap >
                    <Field label={t("Date d'Examen")}>
                        <DatePicker
                            selected={values.date}
                            onChange={handleChangeValue('date')}
                            customInput={<CustomInput tabindex="-1" />}
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
                        <ToggleSwitch id="smoker" labelYes="Oui" labelNo="Non" name="smoker" onChange={handleChange} checked={values.smoker}/>
                    </Field>
                    <Field label={t("Coté mesuré")}>
                        <ToggleSwitch labelYes="Gauche" labelNo="Droit" name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
                    </Field>
                    <Field label={t("Poids Actuel")} >
                        <input type="text" {...inputProps('weight')}/>
                        
                    </Field>
                    <Field label={t("Taille cm")}  >

                        <input type="text" {...inputProps('height')}/>

                    </Field>
                    <Field label={t("Taille cm")}  >

                        <input type="text" {...inputProps('height')}/>

                    </Field>
                    <Field label={t("Taille cm")}  >

                        <input type="text" {...inputProps('height')}/>

                    </Field>
                    <Field label={t("Taille cm")}  >

                        <input type="text" {...inputProps('height')}/>

                    </Field>
                    <Field label={t("Taille cm")}  >

                        <input type="text" {...inputProps('height')}/>

                    </Field>
                </LayoutFlex> 
                <Container fit grow>
                    <ElectricalDataForm/>
                    <pre>
                    {JSON.stringify(values,null,4)}
                    </pre>

                </Container>

                <Container  fit grow>
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
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div> <div className="row header">%Masse Maigre</div>

<div>10</div>
<div>20</div>
<div>39</div>
                    </Grid>
                </Container>

            </LayoutFlexColumn>
            <LayoutFlexColumn>
                <Field label={t("Examinateur")}>

                </Field>
                <Field label={t("BioImpédanceMètre")}>

                </Field>
                <Field label={t("BMI Reference")}>

                </Field>
                <Field label={t("Poids Idéal")}>

                </Field>
                <Field label={t("BMI Actuel")}>

                </Field>
                <Field label={t("Remarques / Interprétations")}>

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
        left_side:false,
        weight: 52,
        height: 177
    },
    t: x => x
}


export default (Editor);
