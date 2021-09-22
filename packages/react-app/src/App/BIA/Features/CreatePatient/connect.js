import { bindSelectors, connect } from '@karsegard/react-redux'
//import { /*create_subject, edit_subject, fetch_pathological_groups, populate_ethno_groups, populate_genders, select_ethno_group, select_genders, select_list_pathological_groups, select_subject_form,create_patient*/    select_genders,
/*  select_ethno_group,
  select_list_pathological_groups,
  select_subject_form} from '@/Providers/Stores/ElectronApp';


*/

import {
  create_subject,
  subject_form_available_options,
  refresh_editor_lists,
  subject_form_default_options,
  edited_subject,
  edit_subject,
  create_patient,
  form_options_loaded,
  select_form_lists,
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = (state,ownProps) => {
  const selectors =bindSelectors({
    subject_form_default_options,
    subject_form_available_options,
    edited_subject,
    form_options_loaded,
  });
  return {
    ...selectors(state),
    custom_lists: select_form_lists(state,'subject')
  }

}

const mapDispatchToProps = {
  refresh_editor_lists,
  create_subject,
  edit_subject,
  create_patient

}


export default connect(mapStateToProps, mapDispatchToProps);