import React, { useEffect, useRef, useState } from 'react'
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn } from '@karsegard/react-core-layout'

import {enlist} from '@karsegard/composite-js';
import {key} from '@karsegard/composite-js/ObjectUtils'

import {filterPropPresentIn} from '@karsegard/react-compose'
import './modal.scss';


export default props=>{

  const{children,...rest}=props;

  const modal_prop_keys = enlist(ModalComponent.defaultProps).map(item => key(item));


  const [modal_props,other_props] = filterPropPresentIn(modal_prop_keys,rest);


  


  return(

    <ModalComponent {...modal_props}>
        <Container className="modal-form"  fit grow>
            {children}
        </Container>
    </ModalComponent>

  )
}
