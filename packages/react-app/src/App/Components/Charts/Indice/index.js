import { identity, is_nil } from "@karsegard/composite-js";
import React from "react";
import { Area, ComposedChart, Label, Line, ReferenceDot, Tooltip, XAxis, YAxis } from 'recharts';

export const LineChart = props => {
    const { data,data_key, noi, width, height, age, value, t,

        XLabel,YLabel,
        XTicks,YTicks
        
    } = props;
    let _data = data.filter(item => {
        return !is_nil(item[data_key])
    });

    let YMin = YTicks[0] - 1

/*    let _data = data.filter(item => {
        return !is_nil(item[noi])
    });

    let YTicks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if (noi === "ffmi") {
       
        YTicks = [13,14,15,16, 17, 18, 19, 20, 21, 22];
    }
    let YMin = YTicks[0] - 1

    const XTicks = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]; */
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
    data:[],
    XTicks:[15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
    YLabel:"Masse Grasse (kg/m2)",
    noi: 'fmi',
    XLabel:"Age (années)",
    YTicks: [1,13,14,15,16, 17, 18, 19, 20, 21, 22]
    
}

export default LineChart