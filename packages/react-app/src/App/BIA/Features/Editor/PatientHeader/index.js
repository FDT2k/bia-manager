import React from 'react';
import { withTranslation } from 'react-i18next';
import {compose} from '@karsegard/composite-js'

import connect from './connect';
import component from './component'
import './patient-header.scss'



const enhance = compose (
    connect,
    withTranslation('translation')    
)

export default enhance(component);