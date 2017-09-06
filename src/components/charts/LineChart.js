import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import CustomizedAxisTick from "./CustomizedAxisTick";

const CustomLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis
        dataKey="dateTime"
        height={75}
        tick={<CustomizedAxisTick />}
        // tick={{ stroke: "red", strokeWidth: 0.01, size: 0 }}
        // tickCount={4}
        // allowDataOverflow={true}
        interval={5}
      />
      <YAxis type="number" domain={["auto", "auto"]} />
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
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
