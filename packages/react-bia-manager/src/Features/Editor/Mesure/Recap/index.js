import React from 'react';
import { useTranslation } from '@';
import IndiceChart from '@/Components/Charts/Indice';
import MassChart from '@/Components/Charts/Mass';
import RecapGrid from '@/Components/RecapGrid';
import RecapFDS from '@/Components/RecapGrid';
import { LayoutFlexColumn,LayoutFlex } from '@karsegard/react-core-layout';

export const Component = props => {

    const {IndiceChartComponent,
        RecapFDSComponent,
        RecapGridComponent,
        MassChartComponent} = props;
    const {t} = useTranslation()

    return (<LayoutFlexColumn style={{ gap: '10px' }}>
        <h4>{t('BIA_RECAP_TITLE')}</h4>
        <RecapGridComponent />
        <h4>{t('FDS_RECAP_TITLE')}</h4>
        <RecapFDSComponent />

        <h4>{t('BODY_MASS_CHART_RECAP_TITLE')}</h4>
        <MassChartComponent/>
        <LayoutFlex>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FFMI_RECAP_TITLE')}</h4>
                <IndiceChartComponent data_key="ffmi" />
            </LayoutFlexColumn>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FMI_RECAP_TITLE')}</h4>
                <IndiceChartComponent data_key="fmi" />
            </LayoutFlexColumn>
        </LayoutFlex>
    </LayoutFlexColumn>)
}

Component.defaultProps = {
    IndiceChartComponent: IndiceChart,
    RecapFDSComponent: RecapFDS,
    RecapGridComponent: RecapGrid,
    MassChartComponent: MassChart,
}

export default Component