import React from 'react';
import Mesure from '@/Features/Editor/Mesure'


import ModSerrement from './Serrement';
import ModRecap from './Recap';
import ModPrintableReport from './PrintableReport';
import {useSelector} from '@karsegard/react-redux'

export default module => {


    const Serrement = ModSerrement(module);
    const Recap = ModRecap(module);
    const PrintableReport = ModPrintableReport(module);
    return props => {


        const canPrint = useSelector(module.selectors.recap_is_valid)

        return (<Mesure canPrint={canPrint} {...props} Serrement={Serrement} Recap={Recap} PrintableReport={PrintableReport} />)
    }
}