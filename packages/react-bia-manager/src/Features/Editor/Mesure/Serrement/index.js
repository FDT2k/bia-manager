import { useTranslation } from '@/Context/Translation';
import { is_empty } from '@karsegard/composite-js';
import { safe_path } from '@karsegard/composite-js';
import { Grid } from '@karsegard/react-core-layout';
import { useForm } from '@karsegard/react-hooks';
import React, { useEffect } from 'react';



const get_norme = (path,obj) => {
    let val = safe_path([],path, obj);
    if(is_empty(val)){
        val = [];
    }

    return val.join('-');
}


export const Component = props => {
    const { initialValues, handleChange } = props;

    const { t,oneDecimal } = useTranslation();

    const { checkboxProps, inputProps, replaceValues } = useForm(initialValues, { usePath: true, onValuesChange: handleChange })

    useEffect(() => {
        let res = replaceValues(initialValues)
    }, [initialValues])

    const left_avg = safe_path("N/A", 'left.avg', initialValues);
    const right_avg = safe_path("N/A", 'right.avg', initialValues);
    const left_norme =  get_norme('left.norme', initialValues);
    const right_norme =  get_norme( 'right.norme', initialValues);

   
    return (
        <>
            <Grid
                className="force-serrement"
                style={{maxWidth:'100%'}}
                templateColumns="repeat(2,1fr) repeat(3,auto) repeat(2,1fr)"
                templateRows="repeat(3,1fr)"
                rowGap={10}
            >
                <div className="header header--left"></div>
                <div className="header header--left">{t('Dominant Hand')}</div>
                <div className="header header--left">{t('Measure 1')}</div>
                <div className="header header--left">{t('Mesaure 2')}</div>
                <div className="header header--left">{t('Measure 3')}</div>
                <div className="header header--left">{t('Average')}</div>
                <div className="header header--left">{t('Norm')}</div>

                <div className="header">{t('Right')}</div>
                <div><input type="checkbox" {...checkboxProps('right.main')} /></div>
                <div><input type="text" {...inputProps('right.data.0')} /></div>
                <div><input type="text" {...inputProps('right.data.1')} /></div>
                <div><input type="text" {...inputProps('right.data.2')} /></div>
                <div>{oneDecimal(right_avg)} </div>
                <div>{right_norme} </div>


                <div className="header">{t('Left')}</div>
                <div><input type="checkbox" {...checkboxProps('left.main')} /></div>

                <div><input type="text" {...inputProps('left.data.0')} /></div>

                <div><input type="text" {...inputProps('left.data.1')} /></div>


                <div><input type="text" {...inputProps('left.data.2')} /></div>

                <div>{oneDecimal(left_avg)} </div>
                <div>{left_norme} </div>

            </Grid>
        </>
    )

}


Component.defaultProps = {
    initialValues: {},
    handleChange: values => console.warn('values changed but no handler', values)
}
export default Component
