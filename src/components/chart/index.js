import React from "react";
import { Header, Message, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LineChart from "./LineChart";
import Loading from "../loading";

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

const LineChartContainer = ({
  isFetching,
  chartDataErrorMessage,
  quoteName,
  quotePrice,
  quoteSymbol,
  quoteErrorMessage,
  chartData,
  chartDataType,
  fetchChartData
}) => {
  const displayError =
    chartDataErrorMessage.length > 0 &&
    quoteErrorMessage !== "Invalid stock symbol";

  const renderChartHeader = () => {
    const options = Object.keys(chartDataTypes).map(type => ({
      text: type,
      value: type
    }));

    const handleChange = (event, data) => {
      fetchChartData(quoteSymbol, data.value);
    };

    return (
      <div className="header-container">
        <Header
        >{`${quoteName} (${quoteSymbol}), Current Price: $${quotePrice}`}</Header>
        <Dropdown
          inline
          options={options}
          defaultValue={chartDataType}
          onChange={handleChange}
        />
      </div>
    );
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="chart-container">
      <Message error content={chartDataErrorMessage} hidden={!displayError} />
      {quoteName && !isFetching && renderChartHeader()}
      {chartData && (
        <div className="chart-wrapper">
          <LineChart
            data={chartData}
            axisInterval={chartDataTypes[chartDataType].axisInterval}
          />
        </div>
      )}
    </div>
  );
};

LineChartContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  chartDataErrorMessage: PropTypes.string,
  quoteName: PropTypes.string,
  quotePrice: PropTypes.string,
  quoteSymbol: PropTypes.string,
  quoteErrorMessage: PropTypes.string,
  chartData: PropTypes.array,
  chartDataType: PropTypes.string,
  fetchChartData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chartData: getChartDataData(state),
  chartDataType: getChartDataType(state),
  isFetching: getIsChartDataFetching(state) || getIsQuoteFetching(state),
  chartDataErrorMessage: getChartDataErrorMessage(state),
  quoteName: getQuoteName(state),
  quotePrice: getQuotePrice(state),
  quoteSymbol: getQuoteSymbol(state),
  quoteErrorMessage: getQuoteErrorMessage(state)
});

export default connect(mapStateToProps, { fetchChartData })(LineChartContainer);
