import React from 'react';
import { Grid } from '@karsegard/react-core-layout'
import { cEx } from '@karsegard/react-compose'


import {useTranslation}  from '@'

export const Component = props => {
    const {t,oneDecimal,dateSysToHuman} =useTranslation();
    const { data, headers, lines,boldlines } = props;
    return (<Grid
        className="recap-grid"

        templateColumns="auto auto repeat(6,1fr)"
        autoRows="18px"
    >

        <div className="row header--column"><span>{t('Dates')}</span></div>
        <div className="row header--column"><span>{t('Norme')}</span></div>
        {
            headers && headers.map((item, idx) => {
                return <div className="row header--column" key={idx}><span>{item.trim() != '' ? dateSysToHuman(new Date(item)) : item}</span></div>
            }
            )
        }

        {lines.map((k, idx) => {
            
            const line = data.find(item => item.label == k)
            debugger;

            const bold = boldlines.includes(k);

            const className = cEx([
                'row',
                {'bold ': _=> bold === true}
            ])
            if (line) {
                const is_pct = line.label.startsWith('pct_')
                return (<React.Fragment key={idx}>
                    <div className={`${className} header--line`}>{t(`${line.label}_recap`)}</div>
                    <div className={`${className} norme`}><span>{line.values['norme']}</span></div>
                    {headers && headers.map((key, idx) => {
                        let val = line.values[key];
                        val = oneDecimal(val);
                        const display_value = !isNaN(val) ? val : 'n/a';
                        return (<div className={`${className} value`} key={idx}><span>{display_value}{(display_value !== "" && is_pct) ? '%' : ''}</span></div>)
                    })}

                </React.Fragment>)
            }

        })}



    </Grid>)
}


Component.defaultProps = {
    t: x => x,
    data:[

        {label:'weight',values:{'2021-01-01':-1000,'2021-01-02':-1000}},
        {label:'ideal_weight',values:{'2021-01-01':-1000,'2021-01-02':-1000}}
    ],
    headers:['2021-01-01','2021-01-02','','','',''], // toujours 6
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
    ],
    boldlines:[
        'pct_ffm',
        'pct_dffm',
        'pct_fm'
    ]
}

export default Component