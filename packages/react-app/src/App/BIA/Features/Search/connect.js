import { connect, bindSelectors } from '@karsegard/react-redux';
import { select_patients_list_filtered, get_backend_stats, search,clear_search,select_tags ,update_tags} from '@/Providers/Stores/ElectronApp';

export default connect(
    bindSelectors(
        {
            select_patients_list_filtered, 
            get_backend_stats,
            tags:select_tags
        }),
    {
        search,
        update_tags,
        clear_search
    }
)