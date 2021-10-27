import { bindSelectors, connect } from '@karsegard/react-redux'


import {
  dismiss_error,
  current_error
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = (state,ownProps) => {
 

  return {
    error: current_error(state)
  }
}

const mapDispatchToProps = {
 
  dismiss:dismiss_error

}


export default connect(mapStateToProps, mapDispatchToProps);