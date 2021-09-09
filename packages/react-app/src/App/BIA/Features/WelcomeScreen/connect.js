import {connect} from '@karsegard/react-redux'
import {open_file,start_loading,stop_loading,create_database} from '@/Providers/Stores/ElectronApp';


export default connect(null,{start_loading,create_database,stop_loading,open_file});