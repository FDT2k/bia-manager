import {connect,bindSelectors} from '@karsegard/react-redux';

import {
    has_error,error_message
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = bindSelectors({
    error:                  has_error,
    err_message:            error_message,
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps,mapDispatchToProps)