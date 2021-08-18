import { bem, getClasseNames } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import FFMIChart from 'bia-layout/components/Charts/FFMI';
import MassChart from 'bia-layout/components/Charts/Mass';
import Button from 'bia-layout/components/Form/Button';
import SafeDatePicker from 'bia-layout/components/Form/Editable/Date';
import EditableSelect from 'bia-layout/components/Form/Editable/Select';
import EditableTextInput from 'bia-layout/components/Form/Editable/TextInput';
import Field from 'bia-layout/components/Form/Fields';
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch';
import Printable from 'bia-layout/components/Printable';
import Tabs, { Tab, TabList, TabPanel } from 'bia-layout/components/Tabs';
import ComparisonTable from 'bia-layout/components/Views/ComparisonTable';
import ElectricalDataForm from 'bia-layout/components/Views/ElectricalDataForm';
import PrintableReport from 'bia-layout/components/Views/PrintableReport';
import RecapGrid from 'bia-layout/components/Views/RecapGrid';
import Container from 'bia-layout/containers/Container';
import { withGridArea } from 'bia-layout/hoc/grid/Area';
import LayoutFlex, { LayoutFlexColumn } from 'bia-layout/layouts/Flex';
import MesureEditorLayout from 'bia-layout/layouts/MesureEditor';
import React, { useEffect, useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { select_current_bia_values, select_mass_chart, select_normes_chart, select_recap_headers, select_recap_list } from 'Store';
import './mesure-editor.scss';













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
                                    <option>résistance</option>
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
            <Printable ref={componentRef}>
                        <PrintableReport />
                    </Printable>
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
