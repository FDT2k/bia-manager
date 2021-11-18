import { bem, getClasseNames } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';


import Printable from '@/Components/Printable';
import PrintableReport from '@/Features/Editor/Mesure/PrintableReport';
import Tabs, { Tab, TabList, TabPanel } from '@/Components/Tabs';


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
import AsideEditor from './AsideEditor';

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
        handleGoBack,
        handleChange: parentHandleChange,
        mesure,
        ...rest2 } = getClasseNames(__base_class, props)
  

    const _handleChange = (...args) => {

        parentHandleChange && parentHandleChange(...args);
    }


    const componentRef = useRef();

    const _handlePrint = useReactToPrint({
        content: () => componentRef.current
    })



    const _handleClickSave = e => {
        // commit the form before saving
        Promise.resolve(_handleChange(values)).then(_ => {
            handleClickSave()

        });
    }



    const result_columns = useMemo(() => ['norme', mesure.most_accurate_formula || 'kushner', 'gva'], [mesure.most_accurate_formula]);

    return (
        <MesureEditorLayout className={className}>
            <TabsWithArea tabIndexOffset={20} renderDisabledPanels={true} area="mesure-editor-main">
                <TabList>
                    <Tab>{t('BIA')}</Tab>
                    <Tab>{t('Force de serrement')}</Tab>
                    <Tab>{t('Récapitulatif')}</Tab>

                </TabList>
                <TabPanel>
                    <BIAEditor data={mesure} onValuesChange={_handleChange}/>
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
                <AsideEditor onValuesChange={_handleChange} handleClickSave={_handleClickSave} handlePrint={_handlePrint} data={mesure}/>
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
    t: x => x,

}




export default (Editor);
