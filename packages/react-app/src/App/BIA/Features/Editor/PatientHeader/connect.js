import { bindSelectors } from "@karsegard/react-redux";
import { connect } from "react-redux";
import { refresh_editor_lists } from "@/Providers/Stores/ElectronApp";



export default connect(
  //  bindSelectors({patho:select_list_pathological_groups}),
  null,
  {refresh_editor_lists}
)