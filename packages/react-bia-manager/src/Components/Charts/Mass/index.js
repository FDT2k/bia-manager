import React from "react";
import { Bar, BarChart, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { identity, is_nil } from "@karsegard/composite-js";
import {useTranslation} from '@'

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
    const {t} = useTranslation()
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
                    <Label value={t("poids (kg)")}  angle={-90} />
                </YAxis>
                {/*<Tooltip />*/}
                <Legend wrapperStyle={{ right: '-110px', top:'50%', fontSize:12 }} layout="vertical"  formatter={renderColorfulLegendText}/>
                <Bar dataKey="ffm" name={t("masse maigre")} stackId="a" fill="#fa8c8c" background={false} />
                <Bar dataKey="fm" name={t("masse grasse")} stackId="a" fill="#faef8c" background={false} />
            </BarChart>
      )
}
BarHorizontalStacked.defaultProps = {
    width:400,
    data:[
        {
          "name": "2011-05-23",
          "ffm": 69.70728546000001,
          "ffmi": 21.277520667867282,
          "fm": 68.49271453999998,
          "fmi": 20.9067838405421
        },
        {
          "name": "2011-06-27",
          "ffm": 65.27281546,
          "ffmi": 19.92393866487592,
          "fm": 59.62718454,
          "fmi": 18.200660706327646
        },
        {
          "name": "2012-05-24",
          "ffm": 61.210315801437375,
          "ffmi": 18.683897256322265,
          "fm": 23.489684198562628,
          "fmi": 7.170014406935877
        },
        {
          "name": "2021-11-17",
          "ffm": 53.03275108378378,
          "ffmi": 16.92768715368629,
          "fm": 1.967248916216224,
          "fmi": 0.627932240485245
        },
        {},
        {}
      ]
      ,
    height:300,
    t: identity

}

export default BarHorizontalStacked