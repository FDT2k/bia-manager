import React from 'react';
import Recap from '@/Features/Editor/Mesure/Recap'


import IndiceChartComponent from '@/Containers/Editor/Mesure/IndiceChart';


import  RecapGridComponent from '@/Containers/Editor/Mesure/RecapGrid';
import  RecapGridFDSComponent from '@/Containers/Editor/Mesure/RecapFDS';
import  MassChartComponent from '@/Containers/Editor/Mesure/MassChart';


export default (module) => {


    const ConnectedRecapGrid = RecapGridComponent(module)
    const ConnectedFDSRecapGrid =  RecapGridFDSComponent(module)
    const ConnectedMassChart = MassChartComponent(module)


    const ConnectedIndiceChart = IndiceChartComponent(module)

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