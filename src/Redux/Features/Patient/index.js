import {makeActionCreators,makeActionTypes} from './actions';
import {makeReducer} from './reducer';
import {actionNamer} from 'Redux/Lib/redux-utils';


const actiontypes = makeActionTypes(actionNamer('patient'));

const actions = makeActionCreators(actiontypes);


const reducer = makeReducer(actiontypes);
const feature = {
    reducer,
    actions,
    selectors: {}
}


export default feature;