import Component from './component';



import './liste-mesure.scss'

import { withTranslation } from 'react-i18next';
import {compose} from '@karsegard/composite-js'



const enhance = compose (
    withTranslation('translation')    
)

export default enhance(Component);


