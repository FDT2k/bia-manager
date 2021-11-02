import { connect, bindSelectors } from '@karsegard/react-redux';


import {
   current_fds,
   update_fds
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = state => ({
    initialValues:current_fds(state)
})

const mapDispatchToProps = {
    handleChange:update_fds
}


export default connect(mapStateToProps, mapDispatchToProps)