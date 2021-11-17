import React, { useEffect } from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/Components/Form/Input';

import { useForm } from '@karsegard/react-hooks';
import { value } from '@karsegard/composite-js/ObjectUtils';

import { oneDecimal, oneDecimalPct } from '@/references/format'
import { safe_path,is_type_number } from '@karsegard/composite-js';

import {useTranslation} from '@/Context/Translation'

export const Component = props => {
    const { initialValues,handleChange } = props;

    const {t} = useTranslation();

    const { values,getValue,checkboxProps,inputProps,replaceValues,handleFieldChange, handleInput } = useForm(initialValues, { usePath: true,onValuesChange: handleChange })

    console.log(values)
    useEffect(()=>{
        let res = replaceValues(initialValues)
    },[initialValues])

    const left_avg = safe_path("N/A",'left.avg',initialValues);
    const right_avg = safe_path("N/A",'right.avg',initialValues);

    const left_norme = safe_path("N/A",'left.norme',initialValues);
    const right_norme = safe_path("N/A",'right.norme',initialValues);
    return (
        <>
            <Grid
                className="force-serrement"
                templateColumns="repeat(3,1fr)"
                templateRows="repeat(7,1fr)"
                rowGap={10}
            >
                <div className="header header--left"></div>
                <div className="header">Gauche</div>
                <div className="header">Droite</div>

             
                <div className="header header--left">{t('Main dominante')}</div>

                <div> <input type="checkbox" {...checkboxProps('left.main')}/></div>
                <div> <input type="checkbox" {...checkboxProps('right.main')}/></div>


                <div className="header header--left">{t('Mesure 1')}</div>
                <div> <input type="text" {...inputProps('left.data.0')}/></div>
                <div> <input type="text"  {...inputProps('right.data.0')}/></div>
                <div className="header header--left">{t('Mesure 2')}</div>

                <div> <input type="text"  {...inputProps('left.data.1')}/></div>
                <div> <input type="text"  {...inputProps('right.data.1')}/></div>
                <div className="header header--left">{t('Mesure 3')}</div>
                <div> <input type="text"  {...inputProps('left.data.2')}/></div>
                <div> <input type="text"  {...inputProps('right.data.2')}/></div>
                <div className="header header--left">{t('Moyenne des mesures')}</div>
                <div> {left_avg} </div>
                <div> {right_avg} </div>
                <div className="header header--left">{t('Normes')}</div>
                <div> {left_norme.toString()}  </div>
                <div> {right_norme.toString()} </div>

            </Grid>
        </>
    )

}


Component.defaultProps = {
    initialValues:{},
    handleChange: values => console.warn('values changed but no handler',values)
}
export default Component
