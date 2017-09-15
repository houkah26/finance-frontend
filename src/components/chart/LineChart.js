import React from "react";
import PropTypes from "prop-types";
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
import CustomToolTip from "./CustomToolTip";

const CustomLineChart = ({ data, axisInterval }) => (
  <div className="line-chart">
    <ResponsiveContainer width="100%" height={400} minWidth={500}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <XAxis
          dataKey="axisLabel"
          height={50}
          tick={<CustomizedAxisTick />}
          interval={axisInterval}
        />
        <YAxis dataKey="open" type="number" domain={["auto", "auto"]} />
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <Tooltip content={<CustomToolTip />} />
        <Line
          isAnimationActive={false}
          type="linear"
          dataKey="open"
          stroke="#8884d8"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

CustomLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  axisInterval: PropTypes.number.isRequired
};

export default CustomLineChart;
