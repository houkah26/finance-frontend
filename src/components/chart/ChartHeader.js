import React from "react";
import PropTypes from "prop-types";
import { Header, Dropdown } from "semantic-ui-react";

const ChartHeader = ({
  quoteName,
  quotePrice,
  quoteSymbol,
  dropdownOptions,
  chartDataType,
  handleDropdownChange
}) => (
  <div className="header-container">
    <Header
    >{`${quoteName} (${quoteSymbol}), Current Price: $${quotePrice}`}</Header>
    <Dropdown
      inline
      options={dropdownOptions}
      defaultValue={chartDataType}
      onChange={handleDropdownChange}
    />
  </div>
);

ChartHeader.propTypes = {
  quoteName: PropTypes.string.isRequired,
  quotePrice: PropTypes.string.isRequired,
  quoteSymbol: PropTypes.string.isRequired,
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  chartDataType: PropTypes.string.isRequired,
  handleDropdownChange: PropTypes.func.isRequired
};

export default ChartHeader;
