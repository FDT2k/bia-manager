import {connect} from '@karsegard/react-redux'
import {open_file,start_loading,stop_loading,} from '@/Providers/Stores/ElectronApp';


export default connect(null,{start_loading,stop_loading,open_file});