import { is_nil } from "@karsegard/composite-js";
import React from "react";
import { ComposedChart, BarChart, Bar, Cell, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, AreaChart, Area ,ReferenceDot} from 'recharts';


const CustomizedAxisTick = props => {
    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    );
};

const renderColorfulLegendText = (value: string, entry: any) => {
    const { color } = entry;

    return <span style={{ color: "#000000" }}>{value}</span>;
};

export const LineChart = props => {
    const { data, noi, width, height, age, value } = props;

    let _data = data.filter(item => {
        return !is_nil(item[noi])
    });
    return (
        <ComposedChart
            width={width}
            height={height}
            data={_data}
            padding={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <XAxis dataKey="age"  type="number" tick={5} domain={['dataMin-10', 'dataMax+5']} >
            <Label value="Age" position="insideBottom" />
                </XAxis>
            <YAxis type="number" domain={[min => Math.round(min-3), max=>Math.round(max+1)]} />

            <Line dataKey={
                item => {
                    return (new Number((item[noi][1] + item[noi][0]) / 2)).toFixed(2);
                }
            } dot={false} stroke="#45f542" />

            <ReferenceDot x={age} y={value} r={5} fill="grey" stroke="none" >
            <Label value={(new Number(value)).toFixed(1)} position="right" />
                </ReferenceDot>
            <Area dataKey={noi} type="linear" fillOpacity="0" stroke="#8884d8" />
            <Tooltip/>
        </ComposedChart>
    )
}
LineChart.defaultProps = {
    width: 400,
    height: 300
}

export default LineChart