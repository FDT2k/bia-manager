import { connect,bindSelectors } from '@karsegard/react-redux'

import {
    select_current_bia_values,
    select_edited_mesure,
    select_edited_patient,
    select_mass_chart,
    select_normes_chart,
    select_recap_headers,
    select_recap_list
} from '@/Store';



const mapStateToProps = bindSelectors({
    select_current_bia_values,
    mesure: select_edited_mesure,
    patient: select_edited_patient,
    mass_chart: select_mass_chart,
    norm_chart: select_normes_chart,
    list_dates: select_recap_headers,
    recap: select_recap_list,
    get_current_bia:select_current_bia_values
})

const mapDispatchToProps = {

    }


export default connect(mapStateToProps, mapDispatchToProps)