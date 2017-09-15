import React from "react";
import PropTypes from "prop-types";
import { Header, Dropdown } from "semantic-ui-react";

const ChartHeader = ({
  quoteName,
  quotePrice,
  quoteSymbol,
  dropdownOptions,
  selectedChartDisplayType,
  handleDropdownChange,
  shouldRenderDropdown
}) => (
  <div className="header-container">
    <Header
    >{`${quoteName} (${quoteSymbol}), Current Price: $${quotePrice}`}</Header>
    {shouldRenderDropdown && (
      <Dropdown
        inline
        options={dropdownOptions}
        defaultValue={selectedChartDisplayType}
        onChange={handleDropdownChange}
      />
    )}
  </div>
);

ChartHeader.propTypes = {
  quoteName: PropTypes.string.isRequired,
  quotePrice: PropTypes.number.isRequired,
  quoteSymbol: PropTypes.string.isRequired,
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedChartDisplayType: PropTypes.string.isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  shouldRenderDropdown: PropTypes.bool.isRequired
};

export default ChartHeader;
