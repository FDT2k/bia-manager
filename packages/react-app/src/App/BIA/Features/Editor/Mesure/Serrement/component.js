import React, { useEffect } from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/bia-layout/components/Form/Input';

import { useForm } from '@karsegard/react-hooks';
import { value } from '@karsegard/composite-js/ObjectUtils';

import { oneDecimal, oneDecimalPct } from '@/references/format'
import { is_type_number } from '@karsegard/composite-js';


export const Component = props => {
    const { t,initialValues,handleChange } = props;



    const { fields,getValue,inputProps,replaceValues,handleFieldChange, handleInput } = useForm(initialValues, { usePath: true,onValuesChange: handleChange })


    useEffect(()=>{
        replaceValues(initialValues)
    },[initialValues])
    return (
        <>
            <Grid
                className="force-serrement"
                templateColumns="repeat(3,1fr)"
                templateRows="repeat(7,1fr)"
                rowGap={10}
            >
                <div className="header"></div>
                <div className="header">Gauche</div>
                <div className="header">Droite</div>

               {/* <LineForm label={t('Gauche')} checked={true} handleChangeValue={handleChangeGroup('left')} />
                <LineForm label={t('Droite')} handleChangeValue={handleChangeGroup('right')} />*/}
                <div className="header">{t('Main dominante')}</div>

                <div> <input type="checkbox" name="left.main" onChange={handleFieldChange} checked={getValue('left.main')}/></div>
                <div> <input type="checkbox" name="right.main" onChange={handleFieldChange}  checked={getValue('right.main')}/></div>

                <div className="header">{t('Mesure 1')}</div>
                <div> <input type="text" {...inputProps('left.data.0')}/></div>
                <div> <input type="text"  {...inputProps('right.data.0')}/></div>
                <div className="header">{t('Mesure 2')}</div>

                <div> <input type="text"  {...inputProps('left.data.1')}/></div>
                <div> <input type="text"  {...inputProps('right.data.1')}/></div>
                <div className="header">{t('Mesure 3')}</div>
                <div> <input type="text"  {...inputProps('left.data.2')}/></div>
                <div> <input type="text"  {...inputProps('right.data.2')}/></div>
                <div className="header">{t('Moyenne des mesures')}</div>
                <div> {(is_type_number(initialValues.left.avg)) ? oneDecimal(initialValues.left.avg) : "N/A"} </div>
                <div> {(is_type_number(initialValues.right.avg)) ? oneDecimal(initialValues.right.avg) : "N/A"} </div>
                <div className="header">{t('Normes')}</div>
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