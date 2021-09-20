import React from 'react';

import { ModalComponent, Container, Grid,LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';



export default props => {
    const {error, err_message } = props;
    return (<>{ error && <ModalComponent>
        <Grid className="modal-content-box" >
            <LayoutFlexColumn alignCenter justBetween>
              <div className="title"><h1>Error</h1></div>
              <div style={{minHeight:'200px'}}>{err_message}
              
              <br/>

              <a href="#/search"> revenir à la liste </a>
              </div>
            </LayoutFlexColumn>
        </Grid>
      </ModalComponent>}</>)
}