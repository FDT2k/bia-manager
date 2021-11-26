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
        <div>{t('Le recapitulatif n\'est pas disponible.')}</div>
        <div>{t('Remplissez le formulaire ou choisissez une mesure valide')}</div>
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