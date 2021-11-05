import { connect, bindSelectors } from '@karsegard/react-redux';

import {
    select_recap_fds,
    select_recap_headers
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = state => ({
    data: select_recap_fds(state),
    headers: select_recap_headers(state),
    lines:['left','right']
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)