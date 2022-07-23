import { safe_path } from '@karsegard/composite-js';
import { LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';


import { useTranslation } from '@'


export const Component =  props => {

    const {t, dateSysToHuman} =useTranslation();
    const safe_string = safe_path('');
    const {patient} = props ;
    return (<>
       
                
                <LayoutFlex justBetween>
                        <div>{t('Last Name//printable report')}: {safe_string('lastname//printable report',patient)} - {t('First Name//printable report')}:  {safe_string('firstname',patient)} </div>
                    <div>{t('Date of birth//printable report')}:  {dateSysToHuman(safe_path('1970-01-01','birthdate',patient))} - ({patient.age || ''} {t('ans//age unit on printable report')})</div>
                </LayoutFlex>
        </>

    )
}


export default Component