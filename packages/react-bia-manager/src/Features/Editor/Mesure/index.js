import { bem, getClasseNames } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';

import Button from '@/Components/Form/Button';
import EditableSelect from '@/Components/Form/Editable/Select';
import EditableTextInput from '@/Components/Form/Editable/TextInput';
import EditableTextArea from '@/Components/Form/Editable/TextArea';

import Field from '@/Components/Form/Fields';

import Printable from '@/Components/Printable';
import PrintableReport from '@/Features/Editor/Mesure/PrintableReport';
import Tabs, { Tab, TabList, TabPanel } from '@/Components/Tabs';


import { safe_path } from '@karsegard/composite-js'
import Serrement from './Serrement';


import { Container, LayoutFlex, LayoutFlexColumn, withGridArea } from '@karsegard/react-core-layout'
import ComparisonTable from './ComparisonTable';

import MesureEditorLayout from '@/Components/MesureEditorLayout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

//import { oneDecimal, oneDecimalPct } from '@/references/format'
import MaskedInput from 'react-maskedinput';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Recap from './Recap'
import { useCustomList, useTranslation } from '@'

import BIAEditor from './BIAEditor'

const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);


const DateMask = ({
    onChangeValue: _onChangeValue,
    value: _value,

}) => {

    const { momentHumanDateFormat } = useTranslation()

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
    const { t, oneDecimal, oneDecimalPct } = useTranslation();
    const {
        handleClickSave,
        className,
        gender,
        handleGoBack,
        handlePrint,
        handleChange: parentHandleChange,
        mesure,
        ...rest2 } = getClasseNames(__base_class, props)


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


    const _handleClickSave = e => {
        // commit the form before saving
        Promise.resolve(_handleChange(values)).then(_ => {
            handleClickSave()

        });
    }



    const result_columns = useMemo(() => ['norme', values.most_accurate_formula || 'kushner', 'gva'], [values.most_accurate_formula]);

    const lists = useCustomList();
debugger;
    return (
        <MesureEditorLayout className={className}>
            <TabsWithArea tabIndexOffset={20} renderDisabledPanels={true} area="mesure-editor-main">
                <TabList>
                    <Tab>{t('BIA')}</Tab>
                    <Tab>{t('Force de serrement')}</Tab>
                    <Tab>{t('Récapitulatif')}</Tab>

                </TabList>
                <TabPanel>
                    <BIAEditor data={values} onValuesChange={_handleChange}/>
                    <Container fit grow>
                        <ComparisonTable data={mesure.bia} columns={result_columns} />
                    </Container>
                </TabPanel>
                <TabPanel>
                    <Serrement />
                </TabPanel>
                <TabPanel>
                  <Recap/>
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

}




export default (Editor);
