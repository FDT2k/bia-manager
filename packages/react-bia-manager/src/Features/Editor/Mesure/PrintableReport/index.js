
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

    console.log(customPrintHeader);
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
                {/* Mesure de la composition corporelle par bio-impédance électrique*/}
                {!customPrintHeader && <h4>{t('Measurement of body composition by electrical bio-impedance')}</h4>}
                {customPrintHeader && <img src={customPrintHeader} className="custom-header" style={{minWidth:'100%',maxWidth:'100%',maxHeight:'50px;'}}/>}
               <HeaderComponent/>
            </ComponentWithArea>
            <ComponentWithArea area="r" >
                <RecapGridComponent/>
            </ComponentWithArea>
            <ComponentWithArea area="z" >
                {/*Evolution de la composition corporelle */}
                <h4>{t('Evolution of body composition')}</h4></ComponentWithArea>
            <ComponentWithArea area="a" >
                <MassChartComponent width={550}  height={190} />
            </ComponentWithArea>
            <ComponentWithArea area="y" >
                {/**Votre position par rapport aux normes */}
                <h4>{t('Your position in relation to the standards')}</h4></ComponentWithArea>
            <ComponentWithArea area="b" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>{t('Fat Free Mass Index')}</h4>
                    <span>{t('Fat free mass / height')}<sup>2</sup></span>
                    <IndiceChartComponent width={350}  height={180}  data_key="ffmi" />
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="c" >
                <LayoutFlexColumn justCenter alignCenter>
                    <h4>{t('Fat Mass Index')}</h4>
                    <span>{t('fat mass / height')}<sup>2</sup></span>
                    <IndiceChartComponent width={350}  height={180}  data_key="fmi"/>
                </LayoutFlexColumn>
            </ComponentWithArea>
            <ComponentWithArea area="fds" >
            <h4>{t('Clamping Force')}</h4>
            <RecapFDSComponent />
            </ComponentWithArea>
            <ComponentWithArea area="footer" >
                {/*Développé par Karsegard Digital Agency Sàrl, en collaboration avec l\'Unité de Nutrition des HUG et la Fondation Nutrition 2000 Plus */}
                <span>{t('Created with BIM')} - {t('Developed by Karsegard Digital Agency Sàrl, in collaboration with Nutrition Unit of HUG and Fondation Nutrition 2000 Plus')} -  v{process.env.RENDERER_VERSION} - {t('imprimé')}: {dateSysToHuman(new Date())}</span>
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