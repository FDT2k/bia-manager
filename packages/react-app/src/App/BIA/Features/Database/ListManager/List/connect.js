import {connect,bindSelectors} from '@karsegard/react-redux'
import {
    list_list_editor,
    filter_list_editor,

    edit_list_editor,
    del_list_editor,
    set_filter_list_editor,
    add_list_editor,
    fetch_list_editor,
    fetch_lists_editor

} from '@/Providers/Stores/ElectronApp';

export default connect(
    bindSelectors({list:list_list_editor})
    ,{fetch:fetch_lists_editor})