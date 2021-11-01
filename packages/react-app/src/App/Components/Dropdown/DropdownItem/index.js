import React from 'react';

import { LayoutFlex } from '@karsegard/react-core-layout';

import {withBaseClass,applyModifiers,compose} from '@karsegard/react-compose'


export default compose (
    withBaseClass('dropdown__item'),
    applyModifiers({justBetween:true, alignCenter:true}),
)(LayoutFlex)