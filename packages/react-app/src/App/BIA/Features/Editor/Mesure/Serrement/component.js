import React, { useEffect } from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/bia-layout/components/Form/Input';

import { useForm } from '@karsegard/react-hooks';
import { value } from '@karsegard/composite-js/ObjectUtils';

import { oneDecimal, oneDecimalPct } from '@/references/format'
import { is_type_number } from '@karsegard/composite-js';


export const Component = props => {
    const { t,initialValues,handleChange } = props;



    const { values,getValue,checkboxProps,inputProps,replaceValues,handleFieldChange, handleInput } = useForm(initialValues, { usePath: true,onValuesChange: handleChange })

    console.log(values)
    useEffect(()=>{
        let res = replaceValues(initialValues)
    },[initialValues])
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
                <div> {(is_type_number(initialValues.left.avg)) ? oneDecimal(initialValues.left.avg) : "N/A"} </div>
                <div> {(is_type_number(initialValues.right.avg)) ? oneDecimal(initialValues.right.avg) : "N/A"} </div>
                <div className="header header--left">{t('Normes')}</div>
                <div> {initialValues.left.norme.toString()}  </div>
                <div> {initialValues.right.norme.toString()} </div>

            </Grid>
        </>
    )

}


Component.defaultProps = {
    initialValues:{},
    handleChange: values => console.warn('values changed but no handler',values)
}
export default Component
