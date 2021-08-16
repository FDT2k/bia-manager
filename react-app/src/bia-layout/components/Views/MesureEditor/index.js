import React, { useMemo, useState, forwardRef, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFieldValues, useKeypress, useFocus } from '@karsegard/react-hooks';

import { useReactToPrint } from 'react-to-print'

import { bem, compose, withModifiers, applyModifiers, withVariables, divElement, withRemovedProps, withBaseClass, getClasseNames, cEx } from 'bia-layout/utils'


import LayoutFlex, { LayoutFlexColumn } from 'bia-layout/layouts/Flex'
import MesureEditorLayout from 'bia-layout/layouts/MesureEditor'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import Field from 'bia-layout/components/Form/Fields'
import Button from 'bia-layout/components/Form/Button'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import Tabs, { TabList, Tab, TabPanel } from 'bia-layout/components/Tabs'
import { Save, Print, Stats } from 'bia-layout/components/Icons';

import { bmi, ideal_weight, mostAccurateFormula } from 'references';
import Input from 'bia-layout/components/Form/Input'
import ToggleEditField from 'bia-layout/hoc/ToggleEdit'

import formulas from 'references/formulas'

import "react-datepicker/dist/react-datepicker.css";
import { is_nil } from '@karsegard/composite-js';

import ComparisonTable from 'bia-layout/components/Views/ComparisonTable';
import RecapGrid from 'bia-layout/components/Views/RecapGrid';

import ElectricalDataForm from 'bia-layout/components/Views/ElectricalDataForm';

import { withGridArea } from 'bia-layout/hoc/grid/Area';

import SafeDatePicker from 'bia-layout/components/Form/Editable/Date';
import EditableTextInput from 'bia-layout/components/Form/Editable/TextInput';
import EditableSelect from 'bia-layout/components/Form/Editable/Select';
import { ComponentWithArea } from 'bia-layout/hoc/grid/Area';
import { useDispatch, useSelector } from 'react-redux';

import './mesure-editor.scss'
import { patient, recap_mass_chart } from 'Redux/Editor/reducer';

import { select_recap_list, select_recap_headers, select_current_bia_values, select_mass_chart, select_normes_chart, select_normes_bygender } from 'Store';
import MassChart from 'bia-layout/components/Charts/Mass'
import FFMIChart from 'bia-layout/components/Charts/FFMI'
import Printable from 'bia-layout/components/Printable';
import { Component } from 'react';


const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);









const [__base_class, element, modifier] = bem('bia-mesure-editor')

const Editor = props => {
    const { className, gender, t, handleGoBack, handlePrint, handleChange: parentHandleChange, mesure, data, ...rest } = getClasseNames(__base_class, props)


    const _handleChange = v => {
        parentHandleChange && parentHandleChange(v);
    }

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(mesure, { handleValuesChange: _handleChange });
    const componentRef = useRef();
    const _handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    /* update internal state if we change the prop */
    useEffect(() => {
        assignValues(mesure);
    }, [mesure]);


    /* temporary, update electrical data, should change to an handle function */

    useEffect(() => {
        _handleChange(values);
    }, [values.data]);



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





    const handleGroupChange = g => {
        setEditedGroup(g)
    }

    const result_columns = ['norme', values.most_accurate_formula || 'kuschner', 'gva'];

    const recap = useSelector(select_recap_list);
    const list_dates = useSelector(select_recap_headers);
    const mass_chart = useSelector(select_mass_chart);
    const norm_chart = useSelector(select_normes_chart);
    const current_bia = useSelector(select_current_bia_values(['fmi', 'ffmi']));
    return (
        <MesureEditorLayout {...rest} className={className}>
            <TabsWithArea tabindexOffset={10} renderDisabledPanels={true} area="mesure-editor-main">
                <TabList>
                    <Tab>Mesures</Tab>
                    <Tab>Résultats</Tab>
                    <Tab>Récapitulatif</Tab>
                    <Tab>Graphiques</Tab>
                    <Tab>Print</Tab>
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
                            <Button onClick={_ => alert('it works')}>Enregistrer</Button>
                            <Button className="btn--secondary" onClick={_ => _handlePrint()}>IMPRIMER</Button>
                        </LayoutFlex>
                    </LayoutFlexColumnWithArea>
                </TabPanel>
                <TabPanel>
                    <Container fit grow>
                        <ElectricalDataForm handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />

                        <br />

                        <ComparisonTable data={mesure.bia} columns={result_columns} />

                    </Container>
                </TabPanel>
                <TabPanel>

                    <RecapGrid data={recap} headers={list_dates} />
                </TabPanel>
                <TabPanel>

                    <MassChart data={mass_chart} />

                    <FFMIChart data={norm_chart} noi="ffmi" age={mesure.current_age} value={current_bia.ffmi} />
                    <FFMIChart data={norm_chart} noi="fmi" age={mesure.current_age} value={current_bia.fmi} />

                </TabPanel>
                <TabPanel>
                    <Printable ref={componentRef}>
                        <Grid
                            contained

                            templateRows="auto auto auto auto auto 20px;"
                            templateColumns="auto auto"
                            templateAreas={[
                                'header header',
                                'r r',

                                'z z',
                                'a a',
                                'y y',
                                'b c',
                                'footer footer'
                            ]}
                        >
                            <ComponentWithArea area="header" style={{ outline: '1px solid blue' }}>

                                <h3>  Mesure de la composition corporelle par bio-impédance électrique</h3>

                                <LayoutFlex justBetween>
                                    <div>
                                        <div>  Nom: </div>
                                        <div>  Prénom: </div>
                                    </div><div>  Date de naissance: </div>
                                </LayoutFlex>
                            </ComponentWithArea>

                            <ComponentWithArea area="r"  style={{ outline: '1px solid blue' }}>
                                <RecapGrid data={recap} headers={list_dates} />
                            </ComponentWithArea>
                            <ComponentWithArea area="z"  style={{ outline: '1px solid blue' }}>
                                <h2>Evolution de la composition corporelle</h2></ComponentWithArea>
                            <ComponentWithArea area="a"  style={{ outline: '1px solid blue' }}>

                                <MassChart width={700} data={mass_chart} />
                            </ComponentWithArea>
                            <ComponentWithArea area="y"  style={{ outline: '1px solid blue' }}>
                                <h3>Votre position par rapport aux normes</h3></ComponentWithArea>
                            <ComponentWithArea area="b"  style={{ outline: '1px solid blue' }}>

                                <LayoutFlexColumn justCenter alignCenter>
                                    <h4>Indice de masse maigre</h4>
                                    <span>masse maigre / (taille * taille)</span>
                                    <FFMIChart data={norm_chart} noi="ffmi" age={mesure.current_age} value={current_bia.ffmi} />
                                </LayoutFlexColumn>
                            </ComponentWithArea>
                            <ComponentWithArea area="c"  style={{ outline: '1px solid blue' }}>
                                <LayoutFlexColumn justCenter alignCenter>
                                    <h4>Indice de masse grasse</h4>
                                    <span>masse maigre / (taille * taille)</span>

                                    <FFMIChart data={norm_chart} noi="fmi" age={mesure.current_age} value={current_bia.fmi} />
                                </LayoutFlexColumn>
                            </ComponentWithArea>
                            <ComponentWithArea area="footer"  style={{ outline: '1px solid blue' }}>
                               <span>Crée avec BioImpedanceManager. v2.0.2 le 11.08.2021</span>
                            </ComponentWithArea>
                        </Grid>
                    </Printable>
                </TabPanel>
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

    ],
}




export default (Editor);
