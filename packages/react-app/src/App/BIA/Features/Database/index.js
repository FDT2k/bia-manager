import MainView from '@/bia-layout/components/Views/MainView';
import {Container,LayoutFlex} from '@karsegard/react-core-layout'
import DatabaseImport from '@/App/BIA/Features/Database/Import';

import React from 'react';
import './page-database.scss';

import ListManagement from '@/App/BIA/Features/Database/ListManager';





export default props => {
    const{ children,handleSubmit,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter}>
            <LayoutFlex cover centered justBetween>

              <Container className="setup-container" style={{width:'300px',height:'200px'}}>
                  <h2>Importer une base</h2>
                  <p>Importer une base csv de la version précédente (java)</p>
                 <DatabaseImport/>
              </Container>
             


              <Container className="setup-container" style={{width:'300px',height:'200px'}}>
                  <h2>Gérer les listes</h2>
                  <ListManagement/>
              </Container>
             
            </LayoutFlex>

        </MainView>
    )

}
