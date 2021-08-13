import React from "react";
import { BarChart, Bar, Cell, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
  
    return <span style={{ color:"#000000" }}>{value}</span>;
  };

export const BarHorizontalStacked = props => {
    const { data,width,height } = props;
    return (
            <BarChart
                width={width}
                height={height}
                data={data}
                padding={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
            >
                <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick />} label={{ rotate: 45 }} />
                <YAxis  >
                    <Label value="poids (kg)" position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip />
                <Legend wrapperStyle={{ right: '0px' }} layout="vertical" formatter={renderColorfulLegendText}/>
                <Bar dataKey="ffm" name="masse maigre" stackId="a" fill="#fa8c8c" background={false} />
                <Bar dataKey="fm" name="masse grasse" stackId="a" fill="#faef8c" background={false} />
            </BarChart>
      )
}
BarHorizontalStacked.defaultProps = {
    width:400,
    height:300
}