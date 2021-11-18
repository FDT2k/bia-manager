import { connect, bindSelectors } from '@karsegard/react-redux';

import {
  change_mesure,
  create_mesure,
  edit_mesure,
  edit_patient,
  fetch_normes,
  refresh_recap,
  delete_mesure,
  change_subject,
  save_global,

  select_edited_mesure,
  select_edited_patient,
  select_current_bia_values,
  select_current_mesure_id,
  select_mass_chart,
  select_recap_headers,
  select_recap_list,
  update_patient,
  recompute_current_mesure,
  set_examinator,
  select_mesures,
  is_file_saving,
  last_saved_diff,
  last_saved
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = state => {
  return {
    ...bindSelectors({
      mesure: select_edited_mesure,
      patient: select_edited_patient,
      select_current_bia_values,
      current_mesure_id: select_current_mesure_id,
      select_mass_chart,
      select_recap_headers,
      last_saved,
      is_file_saving,
      select_recap_list,
      current_mesures: select_mesures
    })(state),
    last_saved_diff: _=>  last_saved_diff()(state)
  }
}

  const mapDispatchToProps = {
    change_mesure,
    create_mesure,
    edit_mesure,
    recompute_current_mesure,
    edit_patient,
    fetch_normes,
    //populate_sporttype,
    //populate_sportrate,
    refresh_recap,
    delete_mesure,
    // delete_mesure_from_db,
    change_subject,
    set_examinator,
    //populate_machines,
    update_patient,
    //   save:save_editor
    save: save_global
  }


  export default connect(mapStateToProps, mapDispatchToProps)