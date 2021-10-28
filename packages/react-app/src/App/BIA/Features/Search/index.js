

import Container from '@/App/BIA/Features/Search/container'
import Component from '@/App/BIA/Features/Search/component'
import connect from '@/App/BIA/Features/Search/connect'
import {compose} from '@karsegard/composite-js'

import { withTranslation } from 'react-i18next';


const enhance = compose (
    connect,
    Container,
    withTranslation('translation')    
)

export default enhance(Component);