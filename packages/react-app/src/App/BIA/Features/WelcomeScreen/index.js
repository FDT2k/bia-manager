import Component from '@/App/BIA/Features/WelcomeScreen/component'
import Container from '@/App/BIA/Features/WelcomeScreen/container'
import connect from '@/App/BIA/Features/WelcomeScreen/connect';

import { withTranslation } from 'react-i18next';

import {compose} from '@karsegard/composite-js'


const enhance = compose (
    connect,
    Container,
    withTranslation('translation')    

)

export default enhance(Component)