import Component from './component';

import connect from './connect';


import { withTranslation } from 'react-i18next';
import {compose} from '@karsegard/composite-js'



const enhance = compose (
    connect,
    withTranslation('translation')    
)

export default enhance(Component);
