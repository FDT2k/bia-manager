import React from 'react';

import {LayoutFlex,LayoutFlexColumn } from '@karsegard/react-core-layout';
import { withBaseClass } from '@karsegard/react-compose';


import {useTranslation} from '@'


export const PageHeader = props => {
    const {label,render,actions,handleAction,children,...rest} = props;
    const {t} = useTranslation();
    return (
    <LayoutFlexColumn {...rest} wrap>                
                <LayoutFlex  justBetween alignCenter>
                    <h2>{label}</h2>

                    <LayoutFlex style={{gap:'10px'}}>
                    {actions && actions.length >0 && actions.map(
                        item=> {
                            return <div onClick={_=>handleAction(item)}>{t(item)}</div>
                        }
                    )}
                    </LayoutFlex>
                </LayoutFlex>
        {children}
    </LayoutFlexColumn>
    )
}


export default withBaseClass('page-header')(PageHeader);