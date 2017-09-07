import React from "react";
import { Header, Message, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
// import moment from "moment";

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
import { fetchChartData } from '../../actions/chartData'

import './index.css'

// const mapData = data => {
//   return Object.keys(data).map(key => ({
//     dateTime: moment(key).format("h:mm A"),
//     value: parseFloat(data[key]["4. close"])
//   }));
// };

// const formatData = data => {
//   const endIndex = data.findIndex(item => item.dateTime === "9:30 AM");

//   return data.slice(0, endIndex + 1).reverse();
// };

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
    }))

    const handleChange = (event, data) => {
      fetchChartData(quoteSymbol, data.value);
    }

    return (
        <div className="header-container">
          <Header textAlign="center">{`${quoteName} (${quoteSymbol}), Current Price: $${quotePrice}`}</Header>
          <Dropdown inline options={options} defaultValue={chartDataType} onChange={handleChange}/>
        </div>
    )
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="chart-container">
      <Message error content={chartDataErrorMessage} hidden={!displayError} />
      {quoteName &&
      !isFetching &&renderChartHeader()}
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
