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
    change_subject,
    has_error,
    error_message,
    populate_machines,
    save,
    save_global,
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
   // delete_mesure_from_db,
    change_subject,

    populate_machines,
    update_patient,
 //   save:save_editor
    save:save_global
}


export default connect(mapStateToProps,mapDispatchToProps)