import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from 'bia-layout/utils'

import Fullscreen from 'bia-layout/containers/Fullscreen'
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';
import {Person} from 'bia-layout/components/Icons';
import List from 'bia-layout/components/Table';

import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';
const MainView = props => {

const {className, ...rest} = props

const classes = cEx(["login-form",className]);


    return (
    <Fullscreen>
        <Grid r3c1 className="bia-main">
            <Navbar>
                <div>BIA Manager</div>
                <LayoutFlex alignCenter><Person/>User doc</LayoutFlex>
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

            </Fullscreen>
        )


}

        /*
        ToggleSwitch.defaultProps = {
        onChange: x=>x,
        id: 'toggle'
        }



        const WithColors =  withVariables(
        compose(x => `--${x}`, kebabize),
        x => `${x}`,
        ['colorYes','colorNo']
        );
        */

        export default MainView;
