import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomizedAxisTick from "./CustomizedAxisTick";
import CustomToolTip from './CustomToolTip';

const CustomLineChart = ({ data, axisInterval }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis
        dataKey="axisLabel"
        height={75}
        tick={<CustomizedAxisTick />}
        // tick={{ stroke: "red", strokeWidth: 0.01, size: 0 }}
        // tickCount={4}
        // allowDataOverflow={true}
        interval={axisInterval}
      />
      <YAxis type="number" domain={["auto", "auto"]} />
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <Tooltip content={<CustomToolTip />}/>
      <Line
        isAnimationActive={false}
        type="linear"
        dataKey="value"
        stroke="#8884d8"
        dot={false}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default CustomLineChart;
