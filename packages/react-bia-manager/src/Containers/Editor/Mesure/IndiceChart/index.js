
import { connect, bindSelectors } from '@karsegard/react-redux';


import IndiceChart from '@/Components/Charts/Indice';



export default (module) => {


    const {
       
        makeSelectBIAResultByKey,
        select_normes_sampling,
        select_edited_age,
        makeSelectIndiceChartYTicks,
        makeSelectYLabelByKey
    } = module.selectors;

  

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

   return ConnectedIndiceChart
}