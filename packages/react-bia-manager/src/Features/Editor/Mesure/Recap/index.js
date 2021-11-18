import React from 'react';
import { useTranslation } from '@';
import FFMIChart from '@/Components/Charts/Indice';
import TESTChart from '@/Components/Charts/FMI';
import MassChart from '@/Components/Charts/Mass';
import RecapGrid from '@/Components/RecapGrid';
import RecapFDS from '@/Components/RecapGrid';
import { LayoutFlexColumn,LayoutFlex } from '@karsegard/react-core-layout';

export const Component = props => {

    const {recap,list_dates,mass_chart} =props
    const {t} = useTranslation()

    return (<LayoutFlexColumn style={{ gap: '10px' }}>
        <h4>{t('BIA_RECAP_TITLE')}</h4>
        <RecapGrid data={recap} headers={list_dates} />
        <h4>{t('FDS_RECAP_TITLE')}</h4>
        <RecapFDS />

        <h4>{t('BODY_MASS_CHART_RECAP_TITLE')}</h4>
        <MassChart data={mass_chart} />
        <LayoutFlex>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FFMI_RECAP_TITLE')}</h4>
                <TESTChart data_key="ffmi" />
            </LayoutFlexColumn>
            <LayoutFlexColumn alignCenter>
                <h4>{t('FMI_RECAP_TITLE')}</h4>
                <TESTChart data_key="fmi" />
            </LayoutFlexColumn>
        </LayoutFlex>
    </LayoutFlexColumn>)
}

export default Component