import React, { useEffect, useRef, useState } from 'react'
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn } from '@karsegard/react-core-layout'

export default props=>{

  const{children,visible,...rest}=props;

  return(

    <ModalComponent visible={visible}>
        <Container className="modal-form" fit grow>
            {children}
        </Container>
    </ModalComponent>

  )
}
