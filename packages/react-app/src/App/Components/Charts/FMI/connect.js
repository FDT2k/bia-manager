import { connect, bindSelectors } from '@karsegard/react-redux';

import {
    makeSelectBIAResultByKey,
    select_normes_sampling,
    select_edited_mesure,
    select_edited_age,
    makeSelectIndiceChartYTicks,
    makeSelectYLabelByKey
} from '@/Providers/Stores/ElectronApp';
import { createSelector } from '@reduxjs/toolkit';


const mapStateToProps = () => {
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


const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)