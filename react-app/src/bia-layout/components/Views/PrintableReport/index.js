import { safe_path } from '@karsegard/composite-js';
import FFMIChart from 'bia-layout/components/Charts/FFMI';
import MassChart from 'bia-layout/components/Charts/Mass';
import RecapGrid from 'bia-layout/components/Views/RecapGrid';
import { ComponentWithArea } from 'bia-layout/hoc/grid/Area';
import {LayoutFlex,LayoutFlexColumn} from '@karsegard/react-core-layout'

import {Grid} from '@karsegard/react-core-layout'
import React from 'react';
import { useSelector } from 'react-redux';
import { select_current_bia_values, select_edited_mesure, select_edited_patient, select_mass_chart, select_normes_chart, select_recap_headers, select_recap_list } from 'Store';
import './printable-report.scss';



export default props => {

    const mesure = useSelector(select_edited_mesure)
    const patient = useSelector(select_edited_patient)
    const recap = useSelector(select_recap_list);
    const list_dates = useSelector(select_recap_headers);
    const mass_chart = useSelector(select_mass_chart);
    const norm_chart = useSelector(select_normes_chart);
    const current_bia = useSelector(select_current_bia_values(['fmi', 'ffmi']));
    const safe_string = safe_path('');
    return (
        <Grid
            contained
            templateRows="fit-content(10px) fit-content(10px) fit-content(10px) fit-content(10px)  fit-content(10px)  fit-content(10px) 20px"
            templateColumns="auto auto"
            style={{minHeight:'100%'}}
            rowGap="10px"
            templateAreas={[
                'header header',
                'r r',
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
                    <span>masse maigre / (taille * taille)</span>
                    <FFMIChart width={350}  height={250} data={norm_chart} noi="ffmi" age={mesure.current_age} value={current_bia.ffmi} />
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="c" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>Indice de masse grasse</h4>
                    <span>masse grasse / (taille * taille)</span>
                    <FFMIChart width={350}  height={250}   data={norm_chart} noi="fmi" age={mesure.current_age} value={current_bia.fmi} />
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="footer" >
                <span>Crée avec BioImpedanceManager. v2.0.2 le 11.08.2021</span>
            </ComponentWithArea>
        </Grid>
    )
}