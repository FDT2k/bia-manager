import React, { useState, useRef } from 'react';
import { useLocation } from "wouter";


import { bem, withBaseClass, divElement,compose } from 'bia-layout/utils'

import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';
import {withGridArea} from 'bia-layout/hoc/grid/Area';

import { Person } from 'bia-layout/components/Icons';


import './main-view.scss';



const [__base_class, element, modifier] = bem('bia-main')
const MainLayout = withBaseClass(__base_class)(Grid);


const Nav = withGridArea(Navbar);
const Footer = withGridArea(Navbar);



const Content = compose(
    withBaseClass(element('content')),
                            withGridArea

                        )(Container)

const MainView = props => {

    const { className, renderFooter,renderLeftNav, ...rest } = props;
    const [location, setLocation] = useLocation();



    return (
        <MainLayout  className={className}>
            <Nav area="header-ml"></Nav>
            <Nav area="header-mr"></Nav>
            <Nav area="header">
                {renderLeftNav && renderLeftNav()}
                {!renderLeftNav &&<div>BIA Manager</div>}
                <LayoutFlex onClick={_=>setLocation("/import")} alignCenter><Person />User</LayoutFlex>
            </Nav>
            <Content area="maincontent">

                {props.children}

               </Content>
            <Footer area="footer">

                {renderFooter && renderFooter()}
                
            </Footer>
            <Nav area="footer-ml"></Nav>
            <Nav area="footer-mr"></Nav>
        </MainLayout>
   )
}

export default MainView;
