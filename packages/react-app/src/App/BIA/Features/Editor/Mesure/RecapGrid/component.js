import React from 'react';
import { Grid } from '@karsegard/react-core-layout'

import { dateSysToHuman, oneDecimal } from '@/references/format';

export const Component = props => {
    const { t, data, headers, lines } = props;

    return (<Grid
        className="recap-grid"
        templateColumns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        autoRows="20px"
    >

        <div>{t('Dates')}</div>
        <div>{t('Norme')}</div>
        {
            headers && headers.map((item, idx) => {
                return <div key={idx}>{item.trim() != '' ? dateSysToHuman(new Date(item)) : item}</div>
            }
            )
        }


        {lines.map((k, idx) => {
            const line = data.find(item => item.label == k)
            if (line) {
                const is_pct = line.label.startsWith('pct_')
                return (<React.Fragment key={idx}>
                    <div>{t(`${line.label}_recap`)}</div>
                    <div>{line.values['norme']}</div>
                    {headers && headers.map((key, idx) => {
                        let val = line.values[key];
                        val = oneDecimal(val);
                        const display_value = !isNaN(val) ? val : '';
                        return (<div key={idx}>{display_value}{(display_value !== "" && is_pct) ? '%' : ''}</div>)
                    })}

                </React.Fragment>)
            }

        })}



    </Grid>)
}


Component.defaultProps = {
    t: x => x,
    lines: [
        'weight',
        'ideal_weight',
        'pct_ideal_weight',
        'height',
        'water',
        'pct_water',
        'ffm',
        'pct_ffm',
        'dffm',
        'pct_dffm',
        'fm',
        'pct_fm',
        'bmi',
        'fmi',
        'ffmi'
    ]
}

export default Component