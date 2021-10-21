import React from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/bia-layout/components/Form/Input';

import { useForm } from '@karsegard/react-hooks';


export const LineForm = ({values,handleChangeValue,checked,label}) => {


    const handleChange= (path,value) => {

        handleChangeValue(path,value)
    }


    return (
        <>
            <div className="lineheader">{label}</div>
            <div><input type="checkbox" checked={checked} /></div>
            <div>35</div>
            <div><Input type="text" onChange={e=>handleChangeValue("0",e.target.value)}/></div>
            <div><Input type="text" /></div>
            <div><Input type="text" /></div>
        </>
    )
}

export default props => {
    const { t } = props;


    const { fields,handleChangeValue } = useForm({
        main: 'left',
        values: {
            left: [0, 1, 2],
            right: [0, 1, 2]
        }
    }, { usePath: true })


    console.log(fields)


    const handleChangeGroup = groupkey => (path,value) => {
        console.log(groupkey,path,value)

        handleChangeValue(`values.${groupkey}.${path}`,value)        ;
        debugger;
    }


    return (
        <>
        {JSON.stringify(fields,null,3)}
        <Grid
            className="force-serrement"
            templateColumns="repeat(6,1fr)"
            templateRows="1fr 1fr 1fr"
            rowGap={10}
        >
            <div className="header"></div>
            <div className="header">{t('dom.')}</div>
            <div className="header">{t('norme')}</div>
            <div className="header">{t('Mesure 1')}</div>
            <div className="header">{t('Mesure 1')}</div>
            <div className="header">{t('Mesure 3')}</div>

            <LineForm label={t('Gauche')} checked={true} handleChangeValue={handleChangeGroup('left')}/>
            <LineForm label={t('Droite')} handleChangeValue={handleChangeGroup('right')}/>


        </Grid>
        </>
    )

}