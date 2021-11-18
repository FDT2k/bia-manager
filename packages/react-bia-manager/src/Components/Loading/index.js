import React from 'react';
import Modal from '@/Components/Modal';
import { ModalComponent, Container, Grid, LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';
import Loading from 'react-loading';



export default props => {
  const { message,visible } = props;

  return (<Modal type="loading" visible={visible}>
    <LayoutFlexColumn alignCenter justBetween>
      <div className="title"><h1>{message}</h1></div>
      <Loading type="spin" color="#000000" />
    </LayoutFlexColumn>
  </Modal>)
}