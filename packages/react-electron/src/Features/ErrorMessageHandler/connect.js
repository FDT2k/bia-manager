import { bindSelectors, connect } from '@karsegard/react-redux'


import {
  actions,
  selectors,
} from '@/Store';


const {dismiss_error} = actions;

const {current_error} = selectors;

const mapStateToProps = (state,ownProps) => {
 

  return {
    error: current_error(state)
  }
}

const mapDispatchToProps = {
 
  dismiss:dismiss_error

}


export default connect(mapStateToProps, mapDispatchToProps);