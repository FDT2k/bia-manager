import {connect} from '@karsegard/react-redux'
import {open_file} from '@/Providers/Stores/ElectronApp';


export default connect(null,{handleOpenDatabase:open_file});