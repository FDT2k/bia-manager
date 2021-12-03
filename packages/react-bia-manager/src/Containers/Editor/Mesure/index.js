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
        
        const normes = useSelector(state => module.submodules.normes.selectors.select_normes(state,{sex:'M',age: props.mesure.current_age}))

        return (<Mesure canPrint={canPrint} normes={normes} {...props} Serrement={Serrement} Recap={Recap} PrintableReport={PrintableReport} />)
    }
}