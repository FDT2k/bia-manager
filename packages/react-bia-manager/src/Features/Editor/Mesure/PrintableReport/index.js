
import React from 'react';

import { ComponentWithArea } from '@karsegard/react-core-layout';
import {LayoutFlex,LayoutFlexColumn} from '@karsegard/react-core-layout'

import {Grid} from '@karsegard/react-core-layout'
import { useTranslation } from '@';

import RecapFDS from '@/Components/RecapGrid';
import ReportHeader from '@/Features/Editor/Mesure/PrintableReport/ReportHeader';
import IndiceChart from '@/Components/Charts/Indice';
import MassChart from '@/Components/Charts/Mass';
import RecapGrid from '@/Components/RecapGrid';


export const Component =  props => {
    const {IndiceChartComponent,
        RecapFDSComponent,
        customPrintHeader,
        RecapGridComponent,
        HeaderComponent,
        MassChartComponent} = props;

    const {t,dateSysToHuman} = useTranslation();

    
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
                {!customPrintHeader && <h4>{t('Mesure de la composition corporelle par bio-impédance électrique')}</h4>}
                {customPrintHeader && <img src={customPrintHeader} className="custom-header" style={{minWidth:'100%',maxWidth:'100%',maxHeight:'50px;'}}/>}
               <HeaderComponent/>
            </ComponentWithArea>
            <ComponentWithArea area="r" >
                <RecapGridComponent/>
            </ComponentWithArea>
            <ComponentWithArea area="z" >
                <h4>{t('Evolution de la composition corporelle')}</h4></ComponentWithArea>
            <ComponentWithArea area="a" >
                <MassChartComponent width={550}  height={190} />
            </ComponentWithArea>
            <ComponentWithArea area="y" >
                <h4>{t('Votre position par rapport aux normes')}</h4></ComponentWithArea>
            <ComponentWithArea area="b" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>{t('Indice de masse maigre')}</h4>
                    <span>{t('masse maigre / taille')}<sup>2</sup></span>
                    <IndiceChartComponent width={350}  height={180}  data_key="ffmi" />
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="c" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>{t('Indice de masse grasse')}</h4>
                    <span>{t('masse grasse / taille')}<sup>2</sup></span>
                    <IndiceChartComponent width={350}  height={180}  data_key="fmi"/>
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="fds" >
            <h4>{t('Force de serrement')}</h4>
            <RecapFDSComponent />
            </ComponentWithArea>
            <ComponentWithArea area="footer" >
                <span>{t('Créé avec BIM')} - {t('Développé par Karsegard Digital Agency Sàrl, en collaboration avec l\'Unité de Nutrition des HUG et la Fondation Nutrition 2000 Plus')} -  v{process.env.RENDERER_VERSION} - {t('imprimé')}: {dateSysToHuman(new Date())}</span>
            </ComponentWithArea>
        </Grid>
    )
}



Component.defaultProps = {
    customPrintHeader:null,
    HeaderComponent: ReportHeader,
    IndiceChartComponent: IndiceChart,
    RecapFDSComponent: RecapFDS,
    RecapGridComponent: RecapGrid,
    MassChartComponent: MassChart,
}

export default Component