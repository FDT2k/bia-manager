import { bindSelectors, connect } from '@karsegard/react-redux'
//import { /*create_subject, edit_subject, fetch_pathological_groups, populate_ethno_groups, populate_genders, select_ethno_group, select_genders, select_list_pathological_groups, select_subject_form,create_patient*/    select_genders,
/*  select_ethno_group,
  select_list_pathological_groups,
  select_subject_form} from '@/Providers/Stores/ElectronApp';


*/

import {
  refresh_editor_lists,
  edited_subject,
  create_patient,
  select_form_lists,
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = (state,ownProps) => {
  const selectors =bindSelectors({
    edited_subject,
  });
  return {
    ...selectors(state),
    custom_lists: select_form_lists(state,'subject')
  }
}

const mapDispatchToProps = {
  refresh_editor_lists,
 // edit_subject,
  create_patient

}


export default connect(mapStateToProps, mapDispatchToProps);