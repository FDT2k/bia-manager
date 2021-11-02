import React, { useEffect } from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/bia-layout/components/Form/Input';

import { useForm } from '@karsegard/react-hooks';



export const Component = props => {
    const { t,initialValues,handleChange } = props;



    const { fields,inputProps,replaceValues, handleChangeValue } = useForm(initialValues, { usePath: true,onValuesChange: handleChange })


    useEffect(()=>{
        replaceValues(initialValues)
    },[initialValues])

    return (
        <>
        <pre>{JSON.stringify(fields,null,3)}</pre>
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

                <div> <input type="checkbox" {...inputProps('left.main')}/></div>
                <div> <input type="checkbox"  {...inputProps('right.main')}/></div>

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
                <div> {initialValues.left.avg} </div>
                <div>  {initialValues.right.avg} </div>
                <div className="header">{t('Normes')}</div>
                <div>  {initialValues.left.norme}  </div>
                <div>  {initialValues.right.norme} </div>

            </Grid>
        </>
    )

}



Component.defaultProps = {
    initialValues:{},
    handleChange: values => console.warn('values changed but no handler',values)
}
export default Component