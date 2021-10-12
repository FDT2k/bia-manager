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
            return (<React.Fragment key={idx}>
                <div>{t(line.label)}</div>
                <div>{line.values['norme']}</div>
                {headers && headers.map((key,idx) => {
                    let val = line.values[key];
                    val = oneDecimal(val);
                    return (<div key={idx}>{!isNaN(val) ? val : ''}</div>)
                })}

            </React.Fragment>)

        })}



    </Grid>)
}


Component.defaultProps = {
    t: x => x
}

export default Component