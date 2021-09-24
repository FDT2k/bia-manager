import {bindSelectors, connect} from '@karsegard/react-redux'
import {
    list_editor_listing,
    fetch_list_editor_list,
    set_filter_list_editor
 } from '@/Providers/Stores/ElectronApp';
 
export default connect(bindSelectors({
    list:list_editor_listing,
    filter: set_filter_list_editor
}),{
    fetch:fetch_list_editor_list,
    set_filter:set_filter_list_editor
})