import React from 'react';
import { Grid } from '@karsegard/react-core-layout'

import { dateSysToHuman, oneDecimal } from '@/references/format';

export const Component = props => {
    const { t, data, headers } = props;
   
    return (<Grid
        className="recap-grid"
        templateColumns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        autoRows="20px"
    >

        <div>{t('Dates')}</div>
        <div>{t('Norme')}</div>
        {
            headers && headers.map((item, idx) => {
                return <div key={idx}>{item.trim()!='' ? dateSysToHuman(new Date(item)) : item}</div>
            }
            )
        }


        {data.map((line,idx) => {
            const is_pct = line.label.startsWith('pct_')
            return (<React.Fragment key={idx}>
                <div>{t(line.label)}</div>
                <div>{line.values['norme']}</div>
                {headers && headers.map((key,idx) => {
                    let val = line.values[key];
                    val = oneDecimal(val);
                    const display_value = !isNaN(val) ? val : '';
                    return (<div key={idx}>{display_value}{(display_value !=="" &&is_pct)?'%':''}</div>)
                })}

            </React.Fragment>)

        })}



    </Grid>)
}


Component.defaultProps = {
    t: x => x
}

export default Component