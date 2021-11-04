import React from 'react';
import { Grid } from '@karsegard/react-core-layout';
import Input from '@/bia-layout/components/Form/Input';

import { useForm } from '@karsegard/react-hooks';



export default props => {
    const { t } = props;


    const { fields, handleChangeValue } = useForm({
        main: 'left',
        values: {
            left: [0, 1, 2],
            right: [0, 1, 2]
        }
    }, { usePath: true })


    console.log(fields)


    const handleChangeGroup = groupkey => (path, value) => {
        console.log(groupkey, path, value)

        handleChangeValue(`values.${groupkey}.${path}`, value);
        debugger;
    }


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

               {/* <LineForm label={t('Gauche')} checked={true} handleChangeValue={handleChangeGroup('left')} />
                <LineForm label={t('Droite')} handleChangeValue={handleChangeGroup('right')} />*/}
                <div className="header header--left">{t('Main dominante')}</div>

                <div> <input type="checkbox"/></div>
                <div> <input type="checkbox"/></div>

                <div className="header header--left">{t('Mesure 1')}</div>
                <div> <input type="text"/></div>
                <div> <input type="text"/></div>
                <div className="header header--left">{t('Mesure 2')}</div>

                <div> <input type="text"/></div>
                <div> <input type="text"/></div>
                <div className="header header--left">{t('Mesure 3')}</div>
                <div> <input type="text"/></div>
                <div> <input type="text"/></div>
                <div className="header header--left">{t('Moyenne des mesures')}</div>
                <div> 12 </div>
                <div> 12</div>
                <div className="header header--left">{t('Normes')}</div>
                <div> 12 </div>
                <div> 12</div>

            </Grid>
        </>
    )

}
