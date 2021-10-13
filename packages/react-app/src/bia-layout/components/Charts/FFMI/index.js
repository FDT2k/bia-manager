import { identity, is_nil } from "@karsegard/composite-js";
import React from "react";
import { Area, ComposedChart, Label, Line, ReferenceDot, Tooltip, XAxis, YAxis } from 'recharts';


const CustomizedAxisTick = props => {
    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    );
};

const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    return <span style={{ color: "#000000" }}>{value}</span>;
};

export const LineChart = props => {
    const { data, noi, width, height, age, value, YAxisLabel,t } = props;

    let _data = data.filter(item => {
        return !is_nil(item[noi])
    });

    let YTicks = [0, 5, 10, 15];

    if (noi === "ffmi") {
        YTicks = [ 15,20];
    }
    return (
        <ComposedChart
            width={width}
            height={height}
            data={_data}
            margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
        >
            <XAxis dataKey="age" type="number" ticks={[15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]} domain={['dataMin-5', 'dataMax+10']}  >
                <Label value={t("Age (années)")} offset={0} position="insideBottom" />
            </XAxis>
            <YAxis type="number" ticks={YTicks} domain={[min => Math.round(min - 3), max => Math.round(max + 1)]} >
                <Label value={noi} offset={0} position="insideLeft" />
            </YAxis>

            <Line dataKey={
                item => {
                    return (new Number((item[noi][1] + item[noi][0]) / 2)).toFixed(2);
                }
            } dot={false} stroke="#45f542" />

            <ReferenceDot x={age} y={value} r={5} fill="grey" stroke="none" >
                <Label value={(new Number(value)).toFixed(1)} position="right" />
            </ReferenceDot>
            <Area dataKey={noi} type="linear" fillOpacity="0" stroke="#8884d8" />
            <Tooltip />
        </ComposedChart>
    )
}
LineChart.defaultProps = {
    width: 400,
    height: 300,
    t:identity
}

export default LineChart