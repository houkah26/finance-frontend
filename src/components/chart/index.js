import React from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LineChart from "./LineChart";
import Loading from "../loading";
import ChartHeader from "./ChartHeader";

import chartDataTypes from "./chartDataTypes";
import {
  getQuoteName,
  getQuoteSymbol,
  getQuotePrice,
  getQuoteErrorMessage,
  getIsChartDataFetching,
  getIsQuoteFetching,
  getChartDataErrorMessage,
  getChartDataData,
  getChartDataType
} from "../../reducers";
import { fetchChartData } from "../../actions/chartData";

import "./index.css";

const ChartContainer = ({
  quoteIsFetching,
  chartDataErrorMessage,
  quoteName,
  quotePrice,
  quoteSymbol,
  quoteErrorMessage,
  chartData,
  chartDataType,
  chartDataIsFetching,
  fetchChartData
}) => {
  const displayError =
    chartDataErrorMessage.length > 0 &&
    quoteErrorMessage !== "Invalid stock symbol";

  const dropdownOptions = Object.keys(chartDataTypes).map(type => ({
    text: type,
    value: type
  }));

  const shouldChartRender = () => {
    if (!chartData) {
      return false;
    }
    if (chartData.length === 0) {
      return false;
    }
    return true;
  };

  const handleDropdownChange = (event, data) => {
    fetchChartData(quoteSymbol, data.value);
  };

  return (
    <div className="chart-container">
      {quoteName &&
      !quoteIsFetching && (
        <ChartHeader
          quoteName={quoteName}
          quotePrice={quotePrice}
          quoteSymbol={quoteSymbol}
          dropdownOptions={dropdownOptions}
          chartDataType={chartDataType}
          handleDropdownChange={handleDropdownChange}
          shouldRenderDropdown={chartData !== null && !chartDataIsFetching}
        />
      )}
      <Message error hidden={!displayError}>
        Network error retrieving stock chart data.{" "}
        <p>
          It seems as though the free API that was being used to get time series
          data is not working (you get what you pay for). Currently working on
          switching to a more reliable source.
        </p>
      </Message>
      {chartDataIsFetching ? (
        <Loading />
      ) : (
        shouldChartRender() && (
          <div className="chart-wrapper">
            <LineChart
              data={chartData}
              axisInterval={chartDataTypes[chartDataType].axisInterval}
            />
          </div>
        )
      )}
    </div>
  );
};

ChartContainer.propTypes = {
  chartDataIsFetching: PropTypes.bool.isRequired,
  quoteIsFetching: PropTypes.bool.isRequired,
  chartDataErrorMessage: PropTypes.string,
  quoteName: PropTypes.string,
  quotePrice: PropTypes.number,
  quoteSymbol: PropTypes.string,
  quoteErrorMessage: PropTypes.string,
  chartData: PropTypes.array,
  chartDataType: PropTypes.string,
  fetchChartData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chartData: getChartDataData(state),
  chartDataType: getChartDataType(state),
  chartDataIsFetching: getIsChartDataFetching(state),
  chartDataErrorMessage: getChartDataErrorMessage(state),
  quoteIsFetching: getIsQuoteFetching(state),
  quoteName: getQuoteName(state),
  quotePrice: getQuotePrice(state),
  quoteSymbol: getQuoteSymbol(state),
  quoteErrorMessage: getQuoteErrorMessage(state)
});

export default connect(mapStateToProps, { fetchChartData })(ChartContainer);
