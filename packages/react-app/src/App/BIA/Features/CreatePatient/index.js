import Component from './component';

import Container from './container';
import connect from './connect';


import './create-patient.scss'

import { withTranslation } from 'react-i18next';
import {compose} from '@karsegard/composite-js'



const enhance = compose (
    connect,
    Container,
    withTranslation('translation')    
)

export default enhance(Component);


