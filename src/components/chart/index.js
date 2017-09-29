import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LineChart from "./LineChart";
import Loading from "../loading";
import ChartHeader from "./ChartHeader";

import chartDisplayTypes from "./chartDisplayTypes";
import formatChartDataByDisplayType from "./formatChartDataByDisplayType";
import {
  getQuoteName,
  getQuoteSymbol,
  getQuotePrice,
  getQuoteErrorMessage,
  getIsChartDataFetching,
  getIsQuoteFetching,
  getChartDataErrorMessage,
  getChartDataData
} from "../../reducers";

import "./index.css";

const dropdownOptions = Object.keys(chartDisplayTypes).map(type => ({
  text: type,
  value: type
}));

class ChartContainer extends Component {
  state = {
    selectedChartDisplayType: "day"
  };

  handleDropdownChange = (event, data) => {
    this.setState({ selectedChartDisplayType: data.value });
  };

  render() {
    const {
      quoteIsFetching,
      quoteName,
      quotePrice,
      quoteSymbol,
      quoteErrorMessage
    } = this.props;

    const { selectedChartDisplayType } = this.state;

    const selectedChartDataType =
      chartDisplayTypes[selectedChartDisplayType].dataType;

    const chartData = this.props.chartData[selectedChartDataType];
    const chartDataErrorMessage = this.props.chartDataErrorMessage[
      selectedChartDataType
    ];
    const chartDataIsFetching = this.props.chartDataIsFetching[
      selectedChartDataType
    ];

    const displayError =
      chartDataErrorMessage.length > 0 &&
      quoteErrorMessage !== "Invalid stock symbol";

    return (
      <div className="chart-container">
        {quoteName &&
        !quoteIsFetching && (
          <ChartHeader
            quoteName={quoteName}
            quotePrice={quotePrice}
            quoteSymbol={quoteSymbol}
            dropdownOptions={dropdownOptions}
            selectedChartDisplayType={selectedChartDisplayType}
            handleDropdownChange={this.handleDropdownChange}
            shouldRenderDropdown={chartData !== null && !chartDataIsFetching}
          />
        )}
        <Message error hidden={!displayError} content={chartDataErrorMessage} />
        {chartDataIsFetching ? (
          <Loading />
        ) : (
          chartData.length > 0 && (
            <LineChart
              data={formatChartDataByDisplayType(
                chartData,
                selectedChartDisplayType
              )}
              axisInterval={
                chartDisplayTypes[selectedChartDisplayType].axisInterval
              }
            />
          )
        )}
      </div>
    );
  }
}

ChartContainer.propTypes = {
  chartData: PropTypes.shape({
    intraDay: PropTypes.array,
    daily: PropTypes.array
  }).isRequired,
  chartDataIsFetching: PropTypes.shape({
    intraDay: PropTypes.bool.isRequired,
    daily: PropTypes.bool.isRequired
  }).isRequired,
  chartDataErrorMessage: PropTypes.shape({
    intraDay: PropTypes.string,
    daily: PropTypes.string
  }).isRequired,
  quoteIsFetching: PropTypes.bool.isRequired,
  quoteName: PropTypes.string,
  quotePrice: PropTypes.number,
  quoteSymbol: PropTypes.string,
  quoteErrorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  chartData: {
    intraDay: getChartDataData(state, "intraDay"),
    daily: getChartDataData(state, "daily")
  },
  chartDataIsFetching: {
    intraDay: getIsChartDataFetching(state, "intraDay"),
    daily: getIsChartDataFetching(state, "daily")
  },
  chartDataErrorMessage: {
    intraDay: getChartDataErrorMessage(state, "intraDay"),
    daily: getChartDataErrorMessage(state, "daily")
  },
  quoteIsFetching: getIsQuoteFetching(state),
  quoteName: getQuoteName(state),
  quotePrice: getQuotePrice(state),
  quoteSymbol: getQuoteSymbol(state),
  quoteErrorMessage: getQuoteErrorMessage(state)
});

export default connect(mapStateToProps)(ChartContainer);
