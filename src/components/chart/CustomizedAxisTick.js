import React from "react";
import PropTypes from "prop-types";

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

CustomizedAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  stroke: PropTypes.string,
  payload: PropTypes.object
};

export default CustomizedAxisTick;
