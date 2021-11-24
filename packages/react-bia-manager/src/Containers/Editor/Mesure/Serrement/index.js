
import { connect } from '@karsegard/react-redux';

import Serrement from '@/Features/Editor/Mesure/Serrement'

export default ({
    selectors: { current_fds },
    actions: { update_fds }
}) => {

  
    const mapStateToProps = state => ({
        initialValues: current_fds(state)
    })

    const mapDispatchToProps = {
        handleChange: update_fds
    }

    return connect(mapStateToProps, mapDispatchToProps)(Serrement)

}