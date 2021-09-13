import {connect,bindSelectors} from '@karsegard/react-redux';

import {
    change_mesure,
    create_mesure,
    edit_mesure,
    edit_patient,
    fetch_normes,
    populate_sporttype,
    populate_sportrate,
    refresh_recap,
    delete_mesure,
    delete_mesure_from_db,
    change_subject,
    has_error,
    error_message,
    populate_machines,
    save,

    // selectors

    select_edited_mesure,
    select_edited_patient,
    select_current_bia_values,
    select_current_mesure_id,
    select_mass_chart,
    select_recap_headers,
    select_recap_list,
    update_patient,
    save_editor
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = bindSelectors({
    mesure:                 select_edited_mesure,
    patient:                select_edited_patient,
    select_current_bia_values,
    current_mesure_id:      select_current_mesure_id,
    select_mass_chart,
    select_recap_headers,
    error:                  has_error,
    err_message:            error_message,
    select_recap_list
})

const mapDispatchToProps = {
    change_mesure,
    create_mesure,
    edit_mesure,
    edit_patient,
    fetch_normes,
    populate_sporttype,
    populate_sportrate,
    refresh_recap,
    delete_mesure,
    delete_mesure_from_db,
    change_subject,

    populate_machines,
    update_patient,
    save:save_editor
}


export default connect(mapStateToProps,mapDispatchToProps)