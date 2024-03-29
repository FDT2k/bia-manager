import { useTranslation } from '@';
import MesureEditorLayout from '@/Components/MesureEditorLayout';
import Printable from '@/Components/Printable';
import Tabs, { Tab, TabList, TabPanel } from '@/Components/Tabs';
import { bem, getClasseNames } from '@karsegard/react-compose';
import { Container, LayoutFlexColumn, withGridArea } from '@karsegard/react-core-layout';
import React, { useMemo, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from 'react-to-print';
import DefaultAsideEditor from './AsideEditor';
import DefaultBIAEditor from './BIAEditor';
import DefaultComparisonTable from './ComparisonTable';
import DefaultRecap from './Recap';
import DefaultSerrement from './Serrement';
import DefaultCommentEditor from './Comment';
import DefaultPrintableReport from '@/Features/Editor/Mesure/PrintableReport';


const LayoutFlexColumnWithArea = withGridArea(LayoutFlexColumn);
const TabsWithArea = withGridArea(Tabs);


const [__base_class, element, modifier] = bem('bia-mesure-editor')

const Editor = props => {

    const { BIAEditor,canPrint,ComparisonTable, Serrement,Recap,AsideEditor,PrintableReport,CommentEditor ,customPrintHeader} = props;


    const { t, oneDecimal, oneDecimalPct } = useTranslation();
    const {
        handleClickSave,
        className,
        handleChange: parentHandleChange,
        mesure} = getClasseNames(__base_class, props)


    const _handleChange = (...args) => {
        debugger;
        parentHandleChange && parentHandleChange(...args);
    }


    const componentRef = useRef();

    const print = useReactToPrint({
        content: () => componentRef.current
    })


    const _handlePrint = ()=> {
        if(canPrint){
            print()
        }else{
            alert(t('To print you must first select a measurment'))
        }
    }





    const result_columns = useMemo(() => ['norme', mesure.most_accurate_formula || 'kushner', 'gva'], [mesure.most_accurate_formula]);
    return (
        <MesureEditorLayout className={className}>
            <TabsWithArea tabIndexOffset={-20} renderDisabledPanels={true} area="mesure-editor-main">
                <TabList>
                    <Tab>{t('BIA')}</Tab>
                    <Tab>{t('Clamping Force')}</Tab>
                    <Tab>{t('Summary')}</Tab>
                </TabList>
                <TabPanel>
                    <BIAEditor normes={props.normes} data={mesure} onValuesChange={_handleChange} />
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
            <CommentEditor onValuesChange={_handleChange} data={mesure}/>
            <LayoutFlexColumnWithArea style={{ gap: '10px' }} area="mesure-editor-aside">
                <AsideEditor onValuesChange={_handleChange} handleClickSave={handleClickSave} handlePrint={_handlePrint} data={mesure} />
            </LayoutFlexColumnWithArea>
            <Printable ref={componentRef} hasHeader={customPrintHeader !=null}>
                <PrintableReport customPrintHeader={customPrintHeader} />
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
    canPrint:true,
    custom_lists: {},
    BIAEditor: DefaultBIAEditor,
    ComparisonTable: DefaultComparisonTable,
    AsideEditor: DefaultAsideEditor,
    CommentEditor : DefaultCommentEditor ,
    Serrement: DefaultSerrement,
    Recap: DefaultRecap,
    PrintableReport: DefaultPrintableReport,
    customPrintHeader: null

}




export default (Editor);
