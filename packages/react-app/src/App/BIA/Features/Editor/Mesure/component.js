import { bem, getClasseNames } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import FFMIChart from '@/bia-layout/components/Charts/FFMI';
import MassChart from '@/bia-layout/components/Charts/Mass';
import Button from '@/bia-layout/components/Form/Button';
import SafeDatePicker from '@/bia-layout/components/Form/Editable/Date';
import EditableSelect from '@/bia-layout/components/Form/Editable/Select';
import EditableTextInput from '@/bia-layout/components/Form/Editable/TextInput';
import Field from '@/bia-layout/components/Form/Fields';
import ToggleSwitch from '@/bia-layout/components/Form/ToggleSwitch';
import Printable from '@/bia-layout/components/Printable';
import PrintableReport from '@/App/BIA/Features/Editor/Mesure/PrintableReport';
import Tabs, { Tab, TabList, TabPanel } from '@/bia-layout/components/Tabs';
import ComparisonTable from '@/bia-layout/components/Views/ComparisonTable';
import ElectricalDataForm from '@/bia-layout/components/Views/ElectricalDataForm';

import RecapGrid from '@/bia-layout/components/Views/RecapGrid';

import {Container,LayoutFlex,LayoutFlexColumn,withGridArea} from '@karsegard/react-core-layout'

import MesureEditorLayout from '@/bia-layout/layouts/MesureEditor';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from 'react-to-print';

import {oneDecimal,oneDecimalPct} from '@/references/format'



const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);



const [__base_class, element, modifier] = bem('bia-mesure-editor')

const Editor = props => {
    const { handleClickSave, className, gender, t, handleGoBack, handlePrint, handleChange: parentHandleChange, mesure, data, ...rest2 } = getClasseNames(__base_class, props)


    const {
        recap ,
        list_dates ,
        mass_chart ,
        norm_chart ,
        get_current_bia ,
        machines ,
        sporttypes ,
        sportrates ,
        ...rest
       } = rest2;

    const current_bia = get_current_bia(['fmi','ffmi'])
    const _handleChange = v => {
        parentHandleChange && parentHandleChange(v);
    }

    const { values, handleChangeValue, inputProps, handleChange, assignValues, replaceValues } = useFieldValues(mesure, { onValuesChange: _handleChange, usePath: true });
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

    const result_columns = useMemo(()=> ['norme', values.most_accurate_formula || 'kuschner', 'gva'],[values.most_accurate_formula]);

   
    const map_itemlist_as_option = item => (<option key={item.id} value={item.id}>{item.name}</option>)

    return (
        <MesureEditorLayout {...rest} className={className}>
            <TabsWithArea tabIndexOffset={20} renderDisabledPanels={true} area="mesure-editor-main">
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
                                <select tabIndex={1} {...inputProps('sport.rate')}>
                                    {sportrates.map(map_itemlist_as_option)}
                                </select>
                            </Field>

                            <Field className="type-activite-physique" label={t("Type d'Activité physique")}>
                                <select tabIndex={2}  {...inputProps('sport.type')}>
                                    {sporttypes.map(map_itemlist_as_option)}
                                </select>
                            </Field>

                            <Field className="fumeur" label={t("Fumeur")}>
                                <ToggleSwitch tabIndex={3}  id="smoker" labelYes="Oui" labelNo="Non" name="smoker" onChange={handleChange} checked={values.smoker} />
                            </Field>

                            <Field className="cote-mesure" label={t("Coté mesuré")}>
                                <ToggleSwitch tabIndex={4}  labelYes="Gauche" labelNo="Droit" name="left_side" onChange={handleChange} id="left_side" checked={values.left_side} />
                            </Field>

                            <Field className="poids-actuel" label={t("Poids Actuel")} >
                                <input type="text" tabIndex={5}  {...inputProps('weight')} />
                            </Field>

                            <Field className="taille" label={t("Taille cm")}  >
                                <input type="text"  tabIndex={6}  {...inputProps('height')} />
                            </Field>

                        </LayoutFlex>
                        <Container fit grow>
                            <ElectricalDataForm tabIndexOffset={7}  handleGroupChange={handleGroupChange} handleComputedChange={electricalHandleValues} handleChange={electricalHandleChange} editedGroup={editedGroup} values={values.data} />
                        </Container>


                        <LayoutFlex>
                            <Button tabIndex={13} onClick={handleClickSave}>Enregistrer</Button>
                            <Button tabIndex={14} className="btn--secondary" onClick={_ => _handlePrint()}>IMPRIMER</Button>
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

                    <EditableSelect {...inputProps('machine')}>
                        {machines.map(machine => (<option value={machine.id} key={machine.id}>{machine.name}</option>))}
                    </EditableSelect>

                </Field>

                <Field label={t("Poids Idéal (%)")}>
                    <div>{oneDecimal(values.ideal_weight)} ({oneDecimalPct(values.pct_ideal_weight)})</div>
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
            {/*    <PrintableReport />*/}
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
