import React from 'react';
import Mesure from '@/Features/Editor/Mesure'


import ModSerrement from './Serrement';
import ModRecap from './Recap';
import ModPrintableReport from './PrintableReport';


export default module => {


    const Serrement = ModSerrement(module);
    const Recap = ModRecap(module);
    const PrintableReport = ModPrintableReport(module);
    return props => {


        return (<Mesure {...props} Serrement={Serrement} Recap={Recap} PrintableReport={PrintableReport} />)
    }
}