import Container from './container';

import Component from './component';
import connect from './connect';
import "react-datepicker/dist/react-datepicker.css";
//styles
import './page-editor.scss';

import React from 'react';
import { withTranslation } from 'react-i18next';
import {compose} from '@karsegard/composite-js'



const enhance = compose (
    connect,
    Container,
    withTranslation('translation')    
)

export default enhance(Component);
