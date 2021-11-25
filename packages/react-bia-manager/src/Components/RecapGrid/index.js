import React from 'react';
import { Grid } from '@karsegard/react-core-layout'
import { cEx } from '@karsegard/react-compose'


import {useTranslation}  from '@'
import { is_empty } from '@karsegard/composite-js';

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
                        const display_value = !isNaN(val) && !is_empty(val) ? oneDecimal(val) : '';
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
        {
          "label": "weight",
          "values": {
            "2011-05-23": "138.2",
            "2011-06-27": "124.9",
            "2012-05-24": "84.7",
            "2021-11-17": "55"
          },
          "limits": {}
        },
        {
          "label": "ideal_weight",
          "values": {
            "2011-05-23": 73.71225,
            "2011-06-27": 73.71225,
            "2012-05-24": 73.71225,
            "2021-11-17": 70.49025
          },
          "limits": {}
        },
        {
          "label": "pct_ideal_weight",
          "values": {
            "2011-05-23": 187.48579781515284,
            "2011-06-27": 169.44266387201586,
            "2012-05-24": 114.90627405892508,
            "2021-11-17": 78.02497508520682
          },
          "limits": {}
        },
        {
          "label": "height",
          "values": {
            "2011-05-23": "181.0",
            "2011-06-27": "181.0",
            "2012-05-24": "181.0",
            "2021-11-17": "177"
          },
          "limits": {}
        },
        {
          "label": "bmi",
          "values": {
            "2011-05-23": "42.2",
            "2011-06-27": "38.1",
            "2012-05-24": "25.9",
            "2021-11-17": "17.6"
          },
          "limits": {}
        },
        {
          "label": "water",
          "values": {
            "2011-05-23": 50.8863183858,
            "2011-06-27": 47.6491552858,
            "2012-05-24": 42.92950714579056,
            "2021-11-17": 41.062085810810814
          },
          "limits": {}
        },
        {
          "label": "pct_water",
          "values": {
            "2011-05-23": 36.8207803081042,
            "2011-06-27": 38.14984410392314,
            "2012-05-24": 50.68418789349535,
            "2021-11-17": 74.65833783783783
          },
          "limits": {}
        },
        {
          "label": "ffm",
          "values": {
            "2011-05-23": 69.70728546000001,
            "2011-06-27": 65.27281546,
            "2012-05-24": 61.210315801437375,
            "2021-11-17": 53.03275108378378
          },
          "limits": {}
        },
        {
          "label": "pct_ffm",
          "values": {
            "norme": "55.6-75.6",
            "2011-05-23": 50.4394250795948,
            "2011-06-27": 52.26006041633306,
            "2012-05-24": 72.2671969320394,
            "2021-11-17": 96.42318378869777
          }
        },
        {
          "label": "ffmi",
          "values": {
            "norme": "14.1-19",
            "2011-05-23": 21.277520667867282,
            "2011-06-27": 19.92393866487592,
            "2012-05-24": 18.683897256322265,
            "2021-11-17": 16.92768715368629
          }
        },
        {
          "label": "dffm",
          "values": {
            "2011-05-23": 18.820967074200006,
            "2011-06-27": 17.623660174200005,
            "2012-05-24": 18.280808655646815,
            "2021-11-17": 11.970665272972965
          },
          "limits": {}
        },
        {
          "label": "pct_dffm",
          "values": {
            "norme": "14.9-19.2",
            "2011-05-23": 13.6186447714906,
            "2011-06-27": 14.110216312409932,
            "2012-05-24": 21.583009038544056,
            "2021-11-17": 21.764845950859936
          }
        },
        {
          "label": "fm",
          "values": {
            "2011-05-23": 68.49271453999998,
            "2011-06-27": 59.62718454,
            "2012-05-24": 23.489684198562628,
            "2021-11-17": 1.967248916216224
          },
          "limits": {}
        },
        {
          "label": "pct_fm",
          "values": {
            "norme": "24.4-44.4",
            "2011-05-23": 49.5605749204052,
            "2011-06-27": 47.73993958366693,
            "2012-05-24": 27.7328030679606,
            "2021-11-17": 3.576816211302225
          }
        },
        {
          "label": "fmi",
          "values": {
            "norme": "4.5-13.5",
            "2011-05-23": 20.9067838405421,
            "2011-06-27": 18.200660706327646,
            "2012-05-24": 7.170014406935877,
            "2021-11-17": 0.627932240485245
          }
        }
      ]
      ,
    headers:["2011-05-23","2011-06-27","2012-05-24","2021-11-17"," "," "], // toujours 6
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