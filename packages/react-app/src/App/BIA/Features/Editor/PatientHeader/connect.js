import { connect,bindSelectors } from "@karsegard/react-redux";
import { refresh_editor_lists,editor_patient_options,select_form_lists } from "@/Providers/Stores/ElectronApp";




export default connect(
  //  bindSelectors({patho:select_list_pathological_groups}),
    (state)=> {

      return {
        custom_lists: select_form_lists(state,'subject_quickedit').reduce((carry,item)=>{
          carry[item.key] = item;
          return carry;
        },{})
      }
    }
  ,
  {
    refresh_editor_lists,
  }
)