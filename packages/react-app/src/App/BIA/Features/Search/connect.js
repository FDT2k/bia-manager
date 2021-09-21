import { connect, bindSelectors } from '@karsegard/react-redux';
import { select_patients_list_filtered, get_backend_stats,search } from '@/Providers/Stores/ElectronApp';


export default connect(
    bindSelectors({ select_patients_list_filtered,get_backend_stats }),
    {
        search
    }
)