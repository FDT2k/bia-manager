import { identity, is_nil } from "@karsegard/composite-js";
import React from "react";
import { Area, ComposedChart, Label, Line, ReferenceDot, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation  } from "@";
export const LineChart = props => {

    const {t} = useTranslation()
    const { data,data_key, noi, width, height, age, value, 

        XLabel,YLabel,
        XTicks,YTicks
        
    } = props;
    let _data = data.filter(item => {
        return !is_nil(item[data_key])
    });

    let YMin = YTicks[0] - 1
    return (
        <>
        <ComposedChart
            width={width}
            height={height}
            data={_data}
            margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
        >
            <XAxis dataKey="age" tick={{ fontSize: 10 }} tickCount={XTicks.length}  interval={0}  type="number" allowDataOverflow={true} ticks={XTicks} domain={['dataMin-5', 'dataMax+10']}  >
                <Label value={t(XLabel)} offset={0} position="insideBottom" />
            </XAxis>
            <YAxis type="number" tick={{ fontSize: 10 }} tickCount={YTicks.length}  interval={0}  ticks={YTicks} domain={[min => YMin, max => Math.round(max + 1)]} >+
                <Label value={t(YLabel)}   angle={-90} />
            </YAxis>

            {/* average line */}
            <Line dataKey={
                item => {
                    return (new Number((item[data_key][1] + item[data_key][0]) / 2)).toFixed(2);
                }
            } dot={false} stroke="#45f542" />

            <ReferenceDot x={age} y={value} r={5} fill="grey" stroke="none" >
                <Label value={(new Number(value)).toFixed(1)} position="right" />
            </ReferenceDot>
            <Area dataKey={data_key} type="linear" fillOpacity="0.05" stroke="#8884d8" />
            {/*<Tooltip />*/}

        </ComposedChart>
        </>
    )
}
LineChart.defaultProps = {
    width: 400,
    height: 300,
    t: identity,
    data:[
        {
          "age": 18,
          "age_range": [18, 34],
          "ffmi_min": 13.8,
          "ffmi_max": 17.6,
          "ffmi": [13.8, 17.6],
          "fmi_min": 3.5,
          "fmi_max": 8.7,
          "fmi": [3.5, 8.7]
        },
        {
          "age": 35,
          "age_range": [35, 54],
          "ffmi_min": 14.4,
          "ffmi_max": 18,
          "ffmi": [14.4, 18],
          "fmi_min": 3.4,
          "fmi_max": 9.9,
          "fmi": [3.4, 9.9],
          "pct_ffm_min": 64.1,
          "pct_ffm_max": 82.2,
          "pct_ffm": [64.1, 82.2],
          "pct_fm_min": 17.8,
          "pct_fm_max": 35.9,
          "pct_fm": [17.8, 35.9],
          "alpha_min": 5.6,
          "alpha_max": 7.3,
          "alpha": [5.6, 7.3]
        },
        {
          "age": 55,
          "age_range": [55, 74],
          "ffmi_min": 14.1,
          "ffmi_max": 19,
          "ffmi": [14.1, 19],
          "fmi_min": 4.5,
          "fmi_max": 13.5,
          "fmi": [4.5, 13.5],
          "pct_ffm_min": 59.5,
          "pct_ffm_max": 78.6,
          "pct_ffm": [59.5, 78.6],
          "pct_fm_min": 21.4,
          "pct_fm_max": 40.5,
          "pct_fm": [21.4, 40.5],
          "alpha_min": 5,
          "alpha_max": 6.6,
          "alpha": [5, 6.6]
        },
        {
          "age": 75,
          "ffmi_min": 12.9,
          "ffmi_max": 18.7,
          "ffmi": [12.9, 18.7],
          "fmi_min": 4.9,
          "fmi_max": 14.3,
          "fmi": [4.9, 14.3],
          "pct_ffm_min": 54.8,
          "pct_ffm_max": 74.1,
          "pct_ffm": [54.8, 74.1],
          "pct_fm_min": 25.9,
          "pct_fm_max": 45.2,
          "pct_fm": [25.9, 45.2]
        }
      ],
    value: 14, // value is required
    age: 28, //value is required
    noi: 'fmi',

    XTicks:[15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
    YLabel:"Masse Grasse (kg/m2)",
    XLabel:"Age (années)",
    YTicks: [1,13,14,15,16, 17, 18, 19, 20, 21, 22]
    
}

export default LineChart