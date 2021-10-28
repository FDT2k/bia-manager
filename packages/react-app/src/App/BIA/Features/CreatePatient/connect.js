import { bindSelectors, connect } from '@karsegard/react-redux'


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
  create_patient

}


export default connect(mapStateToProps, mapDispatchToProps);