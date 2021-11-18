import { bem, cEx, getClasseNames } from '@karsegard/react-compose';
import { Grid } from '@karsegard/react-core-layout'
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@';

import FormulaResultHeader from './FormulaResultHeader'
import FormulaResultRow from './FormulaResultRow'



export const Component = props => {


    const { data, available_columns, selectable, columns, ...rest } = props;
    const [state, setState] = useState(columns);

    const { t } = useTranslation();

    useEffect(() => {
        setState(columns);
    }, [columns])

    const handleChange = (idx, value) => {

        setState(state => {
            let newState = [...state];
            newState[idx] = value
            return newState;
        })

    }
    return (
        <Grid className="comparison-grid" style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gridAutoRows: "1fr"
        }}>
            <FormulaResultHeader available_columns={available_columns} handleChange={handleChange} selectable={selectable} columns={state} />

            {data.filter(item => item.display == true).map((item, idx) =>
                <FormulaResultRow key={idx} available_columns={available_columns} label={item.label} values={item.values} logs={item.logs} columns={state} limits={item.limits} />

            )}

        </Grid>


    )
}

Component.defaultProps = {
    data: [
        {
            "label": "water",
            "values": { "segal": 31.4451456162, "kushner": 41.062085810810814 },
            "limits": {},
            "logs": {
                "segal": "0.73 * 43.07554194",
                "kushner": "8.3148 + ( (0.3821 * pow( 177,2) ) / 444) + 0.1052 * 55"
            },
            "display": true
        },
        {
            "label": "pct_water",
            "values": { "segal": 57.17299202945455, "kushner": 74.65833783783783 },
            "limits": {},
            "logs": {
                "segal": "31.4451456162/55 *100 ",
                "kushner": "41.062085810810814/55 *100 "
            },
            "display": true
        },
        {
            "label": "ffm",
            "values": {
                "gva": 48.1415,
                "segal": 43.07554194,
                "kushner": 53.03275108378378
            },
            "limits": {},
            "logs": {
                "gva": "-4.104 + ((0.518 * (177^2) / 444) +(0.231 * 55) + (0.130 * 23) + (4.229 * 0)",
                "segal": "(0.00091186 * (pow(177,2)))-(0.01486*444) + (0.2999 * 55)-(0.07012 * 68) + 9.37938",
                "kushner": "55- (55*3.576816211302225/100)"
            },
            "display": true
        },
        {
            "label": "pct_ffm",
            "values": {
                "norme": "55.6-75.6",
                "gva": 87.52999999999999,
                "segal": 78.31916716363637,
                "kushner": 96.42318378869777
            },
            "limits": {
                "gva": [55.6, 75.6],
                "segal": [55.6, 75.6],
                "kushner": [55.6, 75.6]
            },
            "logs": {
                "gva": "48.1415 *100 / 55",
                "segal": "43.07554194/55*100",
                "kushner": "53.03275108378378/55*100"
            },
            "display": true
        },
        {
            "label": "ffmi",
            "values": {
                "norme": "14.1-19",
                "gva": 15.366433655718343,
                "segal": 13.749414899932969,
                "kushner": 16.92768715368629
            },
            "limits": { "gva": [14.1, 19], "segal": [14.1, 19], "kushner": [14.1, 19] },
            "logs": {
                "gva": "48.1415 / ((177/100)^2 )",
                "segal": "43.07554194 / ((177/100)^2 )",
                "kushner": "53.03275108378378 / ((177/100)^2 )"
            },
            "display": true
        },
        {
            "label": "dffm",
            "values": { "segal": 11.6303963238, "kushner": 11.970665272972965 },
            "limits": {},
            "logs": {
                "segal": "43.07554194 - 31.4451456162",
                "kushner": "53.03275108378378-41.062085810810814"
            },
            "display": true
        },
        {
            "label": "pct_dffm",
            "values": {
                "norme": "14.9-19.2",
                "segal": 21.146175134181817,
                "kushner": 21.764845950859936
            },
            "limits": { "segal": [14.9, 19.2], "kushner": [14.9, 19.2] },
            "logs": {
                "segal": "11.6303963238/55*100",
                "kushner": "11.970665272972965/55*100"
            },
            "display": true
        },
        {
            "label": "fm",
            "values": {
                "gva": 6.858499999999999,
                "segal": 11.92445806,
                "kushner": 1.967248916216224
            },
            "limits": {},
            "logs": {
                "gva": "55 - 48.1415",
                "segal": "55 - 43.07554194",
                "kushner": "55*3.576816211302225 /100 "
            },
            "display": true
        },
        {
            "label": "pct_fm",
            "values": {
                "norme": "24.4-44.4",
                "gva": 12.469999999999999,
                "segal": 21.680832836363635,
                "kushner": 3.576816211302225
            },
            "limits": {
                "gva": [24.4, 44.4],
                "segal": [24.4, 44.4],
                "kushner": [24.4, 44.4]
            },
            "logs": {
                "gva": "6.858499999999999 * 100 / 55",
                "segal": "11.92445806 * 100 / 55",
                "kushner": "ABS(1-(0.3981 * 70.5608108108108 + (0.3066 * 55) + 0.0952999 * (177-100) + 0.7414) / 55)*100"
            },
            "display": true
        },
        {
            "label": "fmi",
            "values": {
                "norme": "4.5-13.5",
                "gva": 2.18918573845319,
                "segal": 3.806204494238564,
                "kushner": 0.627932240485245
            },
            "limits": {
                "gva": [4.5, 13.5],
                "segal": [4.5, 13.5],
                "kushner": [4.5, 13.5]
            },
            "logs": {
                "gva": "6.858499999999999 / ((177/100)^2 )",
                "segal": "11.92445806 / ((177/100)^2 )",
                "kushner": "1.967248916216224 / ((177/100)^2 )"
            },
            "display": true
        }
    ]
    ,
    available_columns: [
        { name: 'kushner', label: 'Kushner', selectable: true },
        { name: 'segal', label: 'Segal', selectable: true },
        { name: 'norme', label: 'Norme', type: 'norme', selectable: false },
        { name: 'gva', label: 'Gva', selectable: true },
    ],
    columns: ['norme', 'kushner', 'gva'],
    selectable: [false, true, true],
    t: x => x
}
export default Component;