import React from 'react';
import Modal from '@/Components/Modal';
import { ModalComponent, Container, Grid, LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';
import Loading from 'react-loading';



export default props => {
  const { label,visible } = props;

  return (<Modal type="loading" visible={visible}>
    <LayoutFlexColumn alignCenter justBetween>
      <div className="title"><h1>{label}</h1></div>
      <Loading type="spin" color="#000000" />
    </LayoutFlexColumn>
  </Modal>)
}