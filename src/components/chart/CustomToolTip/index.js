import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="custom-tool-tip">
        <div className="value">{payload[0].value}</div>
        <div className="label">{payload[0].payload.toolTipLabel}</div>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.array.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default CustomTooltip;
