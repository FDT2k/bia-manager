import { connect, bindSelectors } from '@karsegard/react-redux';
import { select_patients_list_filtered, get_backend_stats, search,clear_search,select_custom_filters,select_tags ,update_tags,clear_custom_filter,add_custom_filter} from '@/Providers/Stores/ElectronApp';

export default connect(
    bindSelectors(
        {
            select_patients_list_filtered, 
            get_backend_stats,
            tags:select_tags,
            custom_filters:select_custom_filters,

        }),
    {
        clear_custom_filter,
        add_custom_filter,
        search,
        update_tags,
        clear_search
    }
)