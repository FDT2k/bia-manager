import React from 'react';

import { LayoutFlexColumn } from '@karsegard/react-core-layout';
import './page-header.scss'
import { withBaseClass } from '@karsegard/react-compose';





export const PageHeader = props => {
    const {label,children,...rest} = props;
    return (<LayoutFlexColumn {...rest}>

        <h2>{label}</h2>
        {children}

    </LayoutFlexColumn>
    )
}


export default withBaseClass('page-header')(PageHeader);