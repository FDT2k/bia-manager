import { compose } from '@karsegard/composite-js';
import { withTranslation } from 'react-i18next';
import Component from './component';
import connect from './connect';
import './serrement.scss';





const enhance = compose(
    connect,
    withTranslation('translation')
)

export default enhance(Component);
