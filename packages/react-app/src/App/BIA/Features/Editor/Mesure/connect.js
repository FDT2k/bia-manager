import { connect, bindSelectors } from '@karsegard/react-redux';

import {
    select_current_bia_values,
    select_machines,
    select_sporttypes,
    select_sportrates,
    select_mass_chart,
    select_normes_chart,
    select_recap_headers,
    select_recap_list
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = bindSelectors({
    get_current_bia: select_current_bia_values,//selector creator
    machines:select_machines,
    sporttypes: select_sporttypes,
    sportrates:select_sportrates,
    mass_chart:select_mass_chart,
    norm_chart:select_normes_chart,
    list_dates: select_recap_headers,
    recap:  select_recap_list
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)