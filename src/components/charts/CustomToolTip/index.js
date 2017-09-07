import React from 'react';

import './index.css'

const CustomTooltip  = ({ active, label, payload }) => {

  if (active) {
    console.log(label, payload)
    return (
      <div className="custom-tool-tip">
        <div className="value">{payload[0].value}</div>
        <div className="label">{payload[0].payload.toolTipLabel}</div>
      </div>
    );
  }
  return null;
}

// propTypes: {
//   type: PropTypes.string,
//   payload: PropTypes.array,
//   label: PropTypes.string,
// }

export default CustomTooltip;