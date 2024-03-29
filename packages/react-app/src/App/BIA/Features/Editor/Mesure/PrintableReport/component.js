import { safe_path } from '@karsegard/composite-js';
import FFMIChart from '@/App/Components/Charts/FMI';

import MassChart from '@/App/Components/Charts/Mass';
import RecapGrid from '@/App/BIA/Features/Editor/Mesure/RecapGrid';
import { ComponentWithArea } from '@/bia-layout/hoc/grid/Area';
import {LayoutFlex,LayoutFlexColumn} from '@karsegard/react-core-layout'

import {Grid} from '@karsegard/react-core-layout'
import React from 'react';
import { dateSysToHuman } from '@/references/format';

import RecapFDS from '@/App/BIA/Features/Editor/Mesure/RecapGrid/FDS';

export default props => {

    const {
     mesure   ,
     patient   ,
     recap   ,
     list_dates   ,
     mass_chart   ,
     norm_chart   ,
     get_current_bia   ,
    } = props;

    const current_bia = get_current_bia(['fmi','ffmi'])
    const safe_string = safe_path('');
    return (
        <Grid
            className="report"
            contained   
            templateRows="fit-content(10px) fit-content(10px) fit-content(10px) fit-content(10px)  fit-content(10px)  fit-content(10px)  fit-content(10px) 20px"
            templateColumns="auto auto"
            style={{minHeight:'100%'}}
            rowGap="10px"
            templateAreas={[
                'header header',
                'r r',
                'fds fds',
                'z z',
                'a a',
                'y y',
                'b c',
                'footer footer'
            ]}
        >
            <ComponentWithArea area="header" >
                <h3>  Mesure de la composition corporelle par bio-impédance électrique</h3>
                <LayoutFlex justBetween>
                    <div>
                        <div>  Nom: {safe_string('lastname',patient)}</div>
                        <div>  Prénom:  {safe_string('firstname',patient)} </div>
                    </div>
                    <div>  Date de naissance:  {safe_string('birthdate',patient)}</div>
                </LayoutFlex>
            </ComponentWithArea>

            <ComponentWithArea area="r" >
                <RecapGrid data={recap} headers={list_dates} />
            </ComponentWithArea>
            <ComponentWithArea area="z" >
                <h3>Evolution de la composition corporelle</h3></ComponentWithArea>
            <ComponentWithArea area="a" >
                <MassChart width={550}  height={200}  data={mass_chart} />
            </ComponentWithArea>
            <ComponentWithArea area="y" >
                <h3>Votre position par rapport aux normes</h3></ComponentWithArea>
            <ComponentWithArea area="b" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>Indice de masse maigre</h4>
                    <span>masse maigre / taille<sup>2</sup></span>
                    <FFMIChart width={350}  height={200}  data_key="ffmi" />
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="c" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>Indice de masse grasse</h4>
                    <span>masse grasse / taille<sup>2</sup></span>
                    <FFMIChart width={350}  height={200}  data_key="fmi"/>
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="fds" >
            <h4>Force de serrement</h4>
            <RecapFDS />
            </ComponentWithArea>
            <ComponentWithArea area="footer" >
                <span>Crée avec BIM v{process.env.ELECTRON_VERSION} le {dateSysToHuman(new Date())}</span>
            </ComponentWithArea>
        </Grid>
    )
}