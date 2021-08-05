import React, { useMemo, useState, forwardRef, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFieldValues, useKeypress, useFocus } from '@karsegard/react-hooks';


import { bem, compose, withModifiers, applyModifiers, withVariables, divElement,withRemovedProps, withBaseClass, getClasseNames, cEx } from 'bia-layout/utils'


import LayoutFlex, { LayoutFlexColumn } from 'bia-layout/layouts/Flex'
import MesureEditorLayout from 'bia-layout/layouts/MesureEditor'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import Field from 'bia-layout/components/Form/Fields'
import Button from 'bia-layout/components/Form/Button'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import Tabs, { TabList, Tab, TabPanel } from 'bia-layout/components/Tabs'
import { Save, Print, Stats } from 'bia-layout/components/Icons';

import { bmi, ideal_weight } from 'references';
import Input from 'bia-layout/components/Form/Input'
import ToggleEditField from 'bia-layout/hoc/ToggleEdit'

import formulas from 'references/formulas'

import "react-datepicker/dist/react-datepicker.css";
import { is_nil } from '@karsegard/composite-js';

import ComparisonTable from 'bia-layout/components/Views/ComparisonTable';
import ElectricalDataForm from 'bia-layout/components/Views/ElectricalDataForm';

import { withGridArea } from 'bia-layout/hoc/grid/Area';

import './mesure-editor.scss'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input editable-field" onClick={onClick} ref={ref}>
        {value}
    </div>
));


const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);



const EditableTextInput = withBaseClass('editable-field')(props => {

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

})


const EditableSelect = withBaseClass('editable-field')(props => {

    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    const {children,...rest } = props;

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
        {editable && <select ref={ref} onBlur={_ => setEditable(false)}  {...rest} >{children}</select>}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.defaultValue}</div>}
    </>
    )

})





const SafeDatePicker = ({ selected, handleChange }) => {

    let val = selected;

    if (is_nil(selected)) {

        val = new Date();

    }

    if (!(val instanceof Date)) {
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
    const { className, gender, t, handleGoBack, handleChange: parentHandleChange, mesure, data, ...rest } = getClasseNames(__base_class, props)

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(mesure);
    //   const { values:electricalValues, handleChange:electricalHandleChange,replaceValues: replaceElectricalValues } = useFieldValues(mesure.data);

    console.log('MESURE',mesure)

    useEffect(() => {
        console.log('reloading', mesure);

        assignValues(mesure);
        //      replaceElectricalValues(mesure.data);
    }, [mesure.date]);

    /*
        useEffect(() => {
            assignValues({data:electricalValues})
        }, [electricalValues]);
    */


    const _handleChange = v => {
        parentHandleChange && parentHandleChange(v);
    }

    const [editedGroup, setEditedGroup] = useState("a");
    const electricalHandleChange = e => {

        replaceValues(values => {

            let newState = {
                ...values,
                data: {
                    ...values.data,
                    [e.target.name]: e.target.value
                }
            }
            return newState;
        })

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

    useEffect(() => {
        _handleChange(values);
    }, [values]);

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
        <MesureEditorLayout {...rest}  className={className}>
            <TabsWithArea area="mesure-editor-main">
                <TabList>
                    <Tab>Mesures</Tab>
                    <Tab>Résultats</Tab>
                    <Tab>Récapitulatif</Tab>
                    <Tab>Graphiques</Tab>
                </TabList>
                <TabPanel>
                    <LayoutFlexColumnWithArea>

                        <LayoutFlex wrap >
                            <Field className="date-examen" label={t("Date d'Examen")}>
                                <SafeDatePicker
                                    selected={values.date}
                                    handleChange={handleChangeValue('date')}
                                />
                            </Field>

                            <Field className="activite-physique" label={t("Activité physique")}>
                                <select>
                                <option>faible</option>
                                <option>modérée</option>
                                <option>élevée </option>
                                <option>très élevée </option>
                                </select>

                            </Field>
                            <Field className="type-activite-physique" label={t("Type d'Activité physique")}>
                            <select>
                                <option>endurance</option>
                                <option>résistance></option>
                                <option>autre</option>
                                <option>inconnue</option>
                                </select>

                            </Field>
                            <Field className="fumeur" label={t("Fumeur")}>
                                <ToggleSwitch id="smoker" labelYes="Oui" labelNo="Non" name="smoker" onChange={handleChange} checked={values.smoker} />
                            </Field>
                            <Field className="cote-mesure" label={t("Coté mesuré")}>
                                <ToggleSwitch labelYes="Gauche" labelNo="Droit" name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
                            </Field>
                            <Field className="poids-actuel" label={t("Poids Actuel")} >
                                <input type="text" {...inputProps('weight')} />

                            </Field>
                            <Field className="taille" label={t("Taille cm")}  >
                                <input type="text" {...inputProps('height')} />
                            </Field>

                        </LayoutFlex>
                        <Container fit grow>
                            <ElectricalDataForm handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />
                        </Container>


                        <LayoutFlex>
                            <Button onClick={_=>alert('it works')}>Enregistrer</Button>
                            <Button onClick={_=>alert('brrrr. out of ink')}>IMPRIMER</Button>
                        </LayoutFlex>
                    </LayoutFlexColumnWithArea>
                </TabPanel>
                <TabPanel>
                    <Container fit grow>
                        <Grid style={{
                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                            gridAutoRows: "1fr"
                        }}>

                            <ComparisonTable data={mesure.bia} />

                        </Grid>
                    </Container>
                </TabPanel>
                <TabPanel><LayoutFlexColumn></LayoutFlexColumn></TabPanel>
                <TabPanel><LayoutFlexColumn></LayoutFlexColumn></TabPanel>
            </TabsWithArea>

            <LayoutFlexColumnWithArea area="mesure-editor-aside">
                <Field label={t("Examinateur")}>
                    <EditableTextInput value={values.examinator} name="examinator" onChange={handleChange} />
                </Field>
                <Field label={t("BioImpédanceMètre")}>

                    <EditableSelect defaultValue={values.machine}>
                            <option value="BIO-Z">BIO-Z</option>
                            <option value="NUTRIGUARD">NUTRIGUARD</option>
                    </EditableSelect>

                </Field>

                <Field label={t("Poids Idéal (%)")}>
                    <div>{values.ideal_weight} </div>
                </Field>
                <Field label={t("BMI Actuel")}>
                    <div>{values.bmi}</div>
                </Field>
                <Field label={t("BMI Reference")}>
                    <EditableTextInput value={values.bmi_ref} name="bmi_ref" onChange={handleChange} />
                </Field>
                <Field label={t("Remarques / Interprétations")}>
                    <EditableTextInput value={values.comments} name="comments" onChange={handleChange} />
                </Field>

            </LayoutFlexColumnWithArea>
        </MesureEditorLayout>
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
        machine: null,
        current_age: 0

    },
    gender: 'm',
    t: x => x,
    data: [
        {
            label: 'bla', values: {
                'norme': 0,
                'kushner': 0,
                'segal': 0,
                'gva': 0,

            }, limits: []
        },
        {
            label: 'bla', values: {
                'norme': 0,
                'kushner': 2,
                'segal': 4,
                'gva': 3,

            }, limits: []
        },
    ],
}




export default (Editor);
