import { safe_path } from '@karsegard/composite-js';
import { LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';


import { useTranslation } from '@'


export const Component =  props => {

    const {t, dateSysToHuman} =useTranslation();
    const safe_string = safe_path('');
    const {patient} = props ;
    return (<>
       
                <h4>{t('Mesure de la composition corporelle par bio-impédance électrique')}</h4>
                <LayoutFlex justBetween>
                    <div>
                        <div>{t('Nom')}: {safe_string('lastname',patient)}</div>
                        <div>{t('Prénom')}:  {safe_string('firstname',patient)} </div>
                    </div>
                    <div>{t('Date de naissance')}:  {dateSysToHuman(safe_path('1970-01-01','birthdate',patient))}</div>
                </LayoutFlex>
        </>

    )
}


export default Component