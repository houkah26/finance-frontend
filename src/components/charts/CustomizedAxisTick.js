import React from "react";

const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={-10}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform={`rotate(${360 - 45})`}
    >
      {payload.value}
    </text>
  </g>
);

export default CustomizedAxisTick;
