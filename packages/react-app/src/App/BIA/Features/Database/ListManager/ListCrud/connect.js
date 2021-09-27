import { bindSelectors, connect } from '@karsegard/react-redux'
import {
    list_list_editor,
    filter_list_editor,
    set_key_list_editor,
    edit_list_editor,
    del_list_editor,
    set_filter_list_editor,
    add_list_editor,
    fetch_list_editor

} from '@/Providers/Stores/ElectronApp';

export default connect(bindSelectors({
    list: list_list_editor,

    filter: filter_list_editor
}), {
    fetch:fetch_list_editor,
    set_key:set_key_list_editor,
    edit: edit_list_editor,
    del: del_list_editor,
    set_filter: set_filter_list_editor,
    add: add_list_editor
})