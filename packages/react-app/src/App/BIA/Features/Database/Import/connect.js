import {connect,bindSelectors} from '@karsegard/react-redux';

import {
   import_csv
} from '@/Providers/Stores/ElectronApp';


const mapStateToProps = bindSelectors({
   
})

const mapDispatchToProps = {
  
    import_csv
}


export default connect(mapStateToProps,mapDispatchToProps)