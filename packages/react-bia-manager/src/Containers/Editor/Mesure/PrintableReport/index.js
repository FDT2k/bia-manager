import React from 'react';
import PrintableReport from '@/Features/Editor/Mesure/PrintableReport';
import { connect, bindSelectors } from '@karsegard/react-redux';

import ReportHeader from '@/Features/Editor/Mesure/PrintableReport/ReportHeader';


import RecapGridComponent from '@/Containers/Editor/Mesure/RecapGrid';
import RecapGridFDSComponent from '@/Containers/Editor/Mesure/RecapFDS';
import MassChartComponent from '@/Containers/Editor/Mesure/MassChart';
import IndiceChartComponent from '@/Containers/Editor/Mesure/IndiceChart';




export default module => props => {


    const ConnectedRecapGrid = RecapGridComponent(module)


    const ConnectedFDSRecapGrid = RecapGridFDSComponent(module)

    const ConnectedMassChart = MassChartComponent(module)
    const ConnectedIndiceChart = IndiceChartComponent(module)

    const { select_edited_patient } = module.selectors;
    const ConnectedHeader = connect(bindSelectors({
        patient: select_edited_patient
    }))(ReportHeader)


    const components = {
        RecapFDSComponent: ConnectedFDSRecapGrid,
        RecapGridComponent: ConnectedRecapGrid,
        MassChartComponent: ConnectedMassChart,

        IndiceChartComponent: ConnectedIndiceChart,

        HeaderComponent: ConnectedHeader,

    }
    return (<PrintableReport {...props} {...components} />);
}