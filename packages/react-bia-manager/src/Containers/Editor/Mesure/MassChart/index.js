import { connect, bindSelectors } from '@karsegard/react-redux';


import MassChart from '@/Components/Charts/Mass';



export default (module) => {


    const {
        select_mass_chart,
    } = module.selectors;

   

    const ConnectedMassChart = connect(bindSelectors({
        data:select_mass_chart
    }))(MassChart)

    return ConnectedMassChart
}