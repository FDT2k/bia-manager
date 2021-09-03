import React from 'react';

import { ModalComponent, Container, Grid,LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';
import Loading from 'react-loading';



export default props => {
    const {label} = props;

    return ( <ModalComponent>
        <Grid className="modal-content-box" >
          <LayoutFlex cover centered >
            <LayoutFlexColumn alignCenter justBetween>
              <div className="title"><h1>{label}</h1></div>
              <Loading type="spin" color="#000000" />
            </LayoutFlexColumn>
          </LayoutFlex>
        </Grid>
      </ModalComponent>)
}