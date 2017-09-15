import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    const data = payload[0].payload;

    if (data.lastPointOfIntraDay) {
      return (
        <div className="custom-tool-tip">
          <div className="value">{data.toolTipLabel}</div>
          <div className="value">{`Close: ${data.close}`}</div>
        </div>
      );
    }

    return (
      <div className="custom-tool-tip">
        <div className="value">{data.toolTipLabel}</div>
        <div className="value">{`Open: ${data.open}`}</div>
        <div className="value">{`High: ${data.high}`}</div>
        <div className="value">{`Low: ${data.low}`}</div>
        <div className="value">{`Close: ${data.close}`}</div>
        <div className="value">{`Volume: ${data.volume}`}</div>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  type: PropTypes.string
};

export default CustomTooltip;
