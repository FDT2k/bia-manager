import { connect, bindSelectors } from '@karsegard/react-redux';
import {  select_patients_list_filtered,get_backend_stats } from '@/Providers/Stores/ElectronApp';

export default connect(
    bindSelectors({stats:get_backend_stats,patients:select_patients_list_filtered }),
    {}
)