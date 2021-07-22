import React, { useState, useRef } from 'react';
import { bem, withBaseClass, divElement } from 'bia-layout/utils'

import Fullscreen from 'bia-layout/containers/Fullscreen'
import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';

import { Person } from 'bia-layout/components/Icons';
import './style.scss';

import { useLocation } from "wouter";



const MainView = props => {

    const { className, ...rest } = props;
    const [location, setLocation] = useLocation();



    return (<Fullscreen>
        <Grid r3c1 className={className}>
            <Navbar>
                <div>BIA Manager</div>
                <LayoutFlex onClick={_=>setLocation("/import")} alignCenter><Person />User</LayoutFlex>
            </Navbar>
            <Container>

                {props.children}

            </Container>
            <Navbar><div>
                <span> Base de données bia-test </span> -
                <span> Patients 12541235</span> -
                <span> Mesures: 31231 </span>
            </div></Navbar>
        </Grid>

    </Fullscreen>)
}

const [__base_class, element, modifier] = bem('bia-main')
export default withBaseClass(__base_class)(MainView);
