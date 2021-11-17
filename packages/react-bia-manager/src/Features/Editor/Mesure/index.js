import { bem, getClasseNames } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import FFMIChart from '@/Components/Charts/Indice';
import TESTChart from '@/Components/Charts/FMI';
import MassChart from '@/Components/Charts/Mass';
import Button from '@/Components/Form/Button';
import SafeDatePicker from '@/Components/Form/Editable/Date';
import EditableSelect from '@/Components/Form/Editable/Select';
import Select from '@/Components/Form/Select';
import EditableTextInput from '@/Components/Form/Editable/TextInput';
import EditableTextArea from '@/Components/Form/Editable/TextArea';

import Field from '@/Components/Form/Fields';
import ToggleSwitch from '@/Components/Form/ToggleSwitch';
import Printable from '@/Components/Printable';
import PrintableReport from '@/Features/Editor/Mesure/PrintableReport';
import Tabs, { Tab, TabList, TabPanel } from '@/Components/Tabs';
import ElectricalDataForm from '@/Components/ElectricalDataForm';

import { safe_path } from '@karsegard/composite-js'
import ComparisonTable from './ComparisonTable';
import Serrement from './Serrement';
import RecapGrid from './RecapGrid';
import RecapFDS from './RecapGrid/FDS';

import { Container, LayoutFlex, LayoutFlexColumn, withGridArea } from '@karsegard/react-core-layout'

import MesureEditorLayout from '@/Components/MesureEditorLayout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

//import { oneDecimal, oneDecimalPct } from '@/references/format'
import MaskedInput from 'react-maskedinput';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

import { useCustomList, useTranslation } from '@'

const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);


const DateMask = ({
    onChangeValue: _onChangeValue,
    value: _value,

}) => {

    const {momentHumanDateFormat} = useTranslation()

    const updateDate = value => {
        let fieldValue = moment(value, momentHumanDateFormat).isValid() ?
            moment(value, momentHumanDateFormat).format(momentHumanDateFormat) :
            value;
        console.log(value)
        return fieldValue
    }

    return (<MaskedInput mask="11/11/1111" placeholder="dd/mm/yyyy" value={updateDate(_value)} onChange={e => _onChangeValue && _onChangeValue(e.target.value)} />)

}


const [__base_class, element, modifier] = bem('bia-mesure-editor')

const Editor = props => {
    const { t,oneDecimal, oneDecimalPct } = useTranslation();
    const {
        handleClickSave,
        className,
        gender,
        handleGoBack,
        handlePrint,
        handleChange: parentHandleChange,
        mesure,
        data, ...rest2 } = getClasseNames(__base_class, props)


    const {
        recap,
        list_dates,
        mass_chart,
        norm_chart,
        get_current_bia,
        machines,
        sporttypes,
        sportrates,
        custom_lists,
        refresh_editor_lists,
        ...rest
    } = rest2;


    const current_bia = get_current_bia(['fmi', 'ffmi'])
    const _handleChange = (...args) => {

        parentHandleChange && parentHandleChange(...args);
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


    const _handleClickSave = e => {
        // commit the form before saving
        Promise.resolve(_handleChange(values)).then(_ => {
            handleClickSave()

        });
    }




    const handleGroupChange = g => {
        setEditedGroup(g)
    }

    const result_columns = useMemo(() => ['norme', values.most_accurate_formula || 'kuschner', 'gva'], [values.most_accurate_formula]);

    const lists = useCustomList();

    return (
        <MesureEditorLayout className={className}>
            <TabsWithArea tabIndexOffset={20} renderDisabledPanels={true} area="mesure-editor-main">
                <TabList>
                    <Tab>{t('BIA')}</Tab>
                    <Tab>{t('Force de serrement')}</Tab>
                    <Tab>{t('Récapitulatif')}</Tab>

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

                                <Select tabIndex={2}  {...inputProps('sport.rate')} options={safe_path([], 'sport_rate', lists)} />

                            </Field>

                            <Field className="type-activite-physique" label={t("Type d'Activité physique")}>
                                <Select tabIndex={2}  {...inputProps('sport.type')} options={safe_path([], 'sport_type', lists)} />

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


                        <Container fit grow>


                            <ComparisonTable data={mesure.bia} columns={result_columns} />

                        </Container>
                    </LayoutFlexColumnWithArea>
                </TabPanel>
                <TabPanel>
                    <Serrement />
                </TabPanel>
                <TabPanel>
                    <LayoutFlexColumn style={{ gap: '10px' }}>
                        <h4>{t('BIA_RECAP_TITLE')}</h4>
                        <RecapGrid data={recap} headers={list_dates} />
                        <h4>{t('FDS_RECAP_TITLE')}</h4>

                        <RecapFDS />

                        <h4>{t('BODY_MASS_CHART_RECAP_TITLE')}</h4>
                        <MassChart data={mass_chart} />
                        <LayoutFlex>
                            <LayoutFlexColumn alignCenter>
                                <h4>{t('FFMI_RECAP_TITLE')}</h4>
                                <TESTChart data_key="ffmi" />
                            </LayoutFlexColumn>
                            <LayoutFlexColumn alignCenter>
                                <h4>{t('FMI_RECAP_TITLE')}</h4>
                                <TESTChart data_key="fmi" />
                            </LayoutFlexColumn>
                        </LayoutFlex>
                    </LayoutFlexColumn>
                </TabPanel>

            </TabsWithArea>
            <LayoutFlexColumnWithArea style={{ gap: '10px' }} area="mesure-editor-aside">
                <Button style={{ minWidth: '100%', width: '100%', maxWidth: '100%' }} tabIndex={33} onClick={_handleClickSave}>{t('Enregistrer')}</Button>
                <Button tabIndex={44} className="btn--secondary" onClick={_ => _handlePrint()}>{t('Imprimer')}</Button>
                <Field label={t("Examinateur")}>
                    <EditableTextInput value={values.examinator} name="examinator" onChange={handleChange} />
                </Field>
                <Field label={t("Bio-impédancemètre")}>
                    <EditableSelect {...inputProps('machine')} options={safe_path([], 'machines', lists)} />
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
                    <EditableTextArea value={values.comments} name="comments" onChange={handleChange} />
                </Field>
            </LayoutFlexColumnWithArea>
            <Printable ref={componentRef}>
                {<PrintableReport />}
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
    get_current_bia: _ => [],
    custom_lists: {},
    gender: 'm',
    t: x => x,
    data: [

    ],
}




export default (Editor);
