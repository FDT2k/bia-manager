import React from "react";
import { Bar, BarChart, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { identity, is_nil } from "@karsegard/composite-js";


const CustomizedAxisTick = props => {
    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fontSize={9} fill="#000"  textAnchor="middle" >{payload.value}</text>
        </g>
    );
};

const renderColorfulLegendText = (value, entry) => {
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
                    right: 100,
                    left: 20,
                    bottom: 5
                  }}
            >
                <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick />} />
                <YAxis tick={{fontSize:10}} >
                    <Label value="poids (kg)"  angle={-90} />
                </YAxis>
                {/*<Tooltip />*/}
                <Legend wrapperStyle={{ right: '-110px', top:'50%', fontSize:12 }} layout="vertical"  formatter={renderColorfulLegendText}/>
                <Bar dataKey="ffm" name="masse maigre" stackId="a" fill="#fa8c8c" background={false} />
                <Bar dataKey="fm" name="masse grasse" stackId="a" fill="#faef8c" background={false} />
            </BarChart>
      )
}
BarHorizontalStacked.defaultProps = {
    width:400,
    height:300,
    t: identity

}

export default BarHorizontalStacked