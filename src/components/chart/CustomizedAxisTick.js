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
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  stroke: PropTypes.number,
  payload: PropTypes.object.isRequired
};

export default CustomizedAxisTick;
