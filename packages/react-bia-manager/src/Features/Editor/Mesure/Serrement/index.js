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
                <div className="header"></div>
                <div className="header truncate">{t('Main Hand//clamping force')}</div>
                <div className="header">{t('Measurement 1//clamping force')}</div>
                <div className="header">{t('Measurement 2//clamping force')}</div>
                <div className="header">{t('Measurement 3//clamping force')}</div>
                <div className="header truncate">{t('Average//clamping force')}</div>
                <div className="header truncate">{t('Standards//clamping force')}</div>

                <div className="header header--left">{t('Right//clamping force hand')}</div>
                <div><input type="checkbox" {...checkboxProps('right.main')} /></div>
                <div><input type="text" {...inputProps('right.data.0')} /></div>
                <div><input type="text" {...inputProps('right.data.1')} /></div>
                <div><input type="text" {...inputProps('right.data.2')} /></div>
                <div>{oneDecimal(right_avg)} </div>
                <div>{right_norme} </div>



                <div className="header">{t('Left//clamping force hand')}</div>
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
