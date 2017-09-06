import React from "react";
import { Header, Message } from "semantic-ui-react";
import { connect } from "react-redux";
// import moment from "moment";

import LineChart from "./LineChart";
import Loading from "../loading";

import {
  getQuoteName,
  getQuoteSymbol,
  getQuotePrice,
  getQuoteErrorMessage,
  getIsChartDataFetching,
  getIsQuoteFetching,
  getChartDataErrorMessage,
  getChartDataData,
  getChartDataDate
} from "../../reducers";

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
  chartData
}) => {
  const displayError =
    chartDataErrorMessage.length > 0 &&
    quoteErrorMessage !== "Invalid stock symbol";

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <Message error content={chartDataErrorMessage} hidden={!displayError} />
      {quoteName &&
      !isFetching && (
        <Header textAlign="center">{`${quoteName} (${quoteSymbol}), Current Price: $${quotePrice}`}</Header>
      )}
      {chartData && <LineChart data={chartData} />}
    </div>
  );
};

const mapStateToProps = state => ({
  chartData: getChartDataData(state),
  chartDate: getChartDataDate(state),
  isFetching: getIsChartDataFetching(state) || getIsQuoteFetching(state),
  chartDataErrorMessage: getChartDataErrorMessage(state),
  quoteName: getQuoteName(state),
  quotePrice: getQuotePrice(state),
  quoteSymbol: getQuoteSymbol(state),
  quoteErrorMessage: getQuoteErrorMessage(state)
});

export default connect(mapStateToProps)(LineChartContainer);
