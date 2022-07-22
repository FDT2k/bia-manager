import React from 'react';
import { useTranslation } from '@';
import IndiceChart from '@/Components/Charts/Indice';
import MassChart from '@/Components/Charts/Mass';
import RecapGrid from '@/Components/RecapGrid';
import RecapFDS from '@/Components/RecapGrid';
import { LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';

const InvalidRecap = props => {
    const {t} = useTranslation();
    return (<>
        <div>{t('The summary is not available')}</div>
        <div>{t('Fill out the form or choose a valid measurement')}</div>
    </>)
}

export const Component = props => {

    const { IndiceChartComponent,
        RecapFDSComponent,
        RecapGridComponent,
        InvalidRecapComponent,
        MassChartComponent,
        valid } = props;
    const { t } = useTranslation()

    return (<LayoutFlexColumn style={{ gap: '10px' }}>
        {valid && <>
        <h4>{t('BIA Summary Title')}</h4>
        <RecapGridComponent />
        <h4>{t('Clamping Force Summary Title')}</h4>
        <RecapFDSComponent />

        <h4>{t('Body Mass Chart Summary Title')}</h4>
        <MassChartComponent/>
        <LayoutFlex>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FFMI Chart Summary Title')}</h4>
                <IndiceChartComponent data_key="ffmi" />
            </LayoutFlexColumn>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FMI Chart Summary Title')}</h4>
                <IndiceChartComponent data_key="fmi" />
            </LayoutFlexColumn>
        </LayoutFlex> </>}
        {!valid && <InvalidRecapComponent/>}
    </LayoutFlexColumn>)
}

Component.defaultProps = {
    IndiceChartComponent: IndiceChart,
    RecapFDSComponent: RecapFDS,
    RecapGridComponent: RecapGrid,
    MassChartComponent: MassChart,
    InvalidRecapComponent: InvalidRecap

}

export default Component