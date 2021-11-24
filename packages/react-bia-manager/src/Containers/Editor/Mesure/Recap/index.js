import React from 'react';
import Recap from '@/Features/Editor/Mesure/Recap'
import { connect, bindSelectors } from '@karsegard/react-redux';


import RecapGridComponent from '@/Components/RecapGrid';
import MassChart from '@/Components/Charts/Mass';
import IndiceChart from '@/Components/Charts/Indice';



export default ({
    selectors: {
        select_recap_list,
        select_recap_headers,
        select_recap_fds,
        select_headers_fds,
        select_mass_chart,

        makeSelectBIAResultByKey,
        select_normes_sampling,
        select_edited_mesure,
        select_edited_age,
        makeSelectIndiceChartYTicks,
        makeSelectYLabelByKey
    }
}) => {

    const ConnectedRecapGrid = connect(bindSelectors({
        data: select_recap_list,
        headers: select_recap_headers
    }))(RecapGridComponent)


    const ConnectedFDSRecapGrid = connect(bindSelectors({
        data: select_recap_fds,
        headers: select_headers_fds,
        lines:state=>['left','right']
    }))(RecapGridComponent)


    const ConnectedMassChart = connect(bindSelectors({
        data:select_mass_chart
    }))(MassChart)


    const mapIndiceChart = ()=> {
        const bia_results = makeSelectBIAResultByKey();
        const y_ticks = makeSelectIndiceChartYTicks();
        const labelByKey = makeSelectYLabelByKey();
        return (state, props) => {
            return {
                age: select_edited_age(state),
                data: select_normes_sampling(state),
                value: bia_results(state, props),
                YTicks: y_ticks(state,props),
                YLabel:labelByKey(state,props)
            }
        }
    }

    const ConnectedIndiceChart = connect (mapIndiceChart)(IndiceChart)

    const components = {
        IndiceChartComponent: ConnectedIndiceChart,
        RecapFDSComponent: ConnectedFDSRecapGrid,
        RecapGridComponent: ConnectedRecapGrid,
         MassChartComponent: ConnectedMassChart,
    }
    return props => {



        return <Recap
            {...components}

        />;
    }
}