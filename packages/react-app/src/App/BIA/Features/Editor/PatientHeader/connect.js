import { connect,bindSelectors } from "@karsegard/react-redux";
import { refresh_editor_lists,editor_patient_options } from "@/Providers/Stores/ElectronApp";





export default connect(
  //  bindSelectors({patho:select_list_pathological_groups}),
  bindSelectors({
    available_options:editor_patient_options
  }),
  {refresh_editor_lists}
)