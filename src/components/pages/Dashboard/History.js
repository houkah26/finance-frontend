import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchStock } from "../../../actions/stock";
import {
  getStockList,
  getIsStockFetching,
  getStockErrorMessage
} from "../../../reducers";

import Loading from "../../loading";
import Table from "../../table";
import NoStockInPortfolio from "./NoStockInPortfolio";

const tableHeaders = [
  { name: "Date/Time", key: "createdAt", sortKey: "unixTimeStamp" },
  { name: "Transaction", key: "action" },
  { name: "Symbol", key: "stockSymbol" },
  { name: "Name", key: "stockName" },
  { name: "Shares", key: "shares" },
  { name: "Price ($)", key: "price", sortKey: "priceNum" },
  { name: "Total ($)", key: "totalValue", sortKey: "totalValueNum" }
];

class History extends Component {
  componentDidMount() {
    this.props.fetchStock("history");
  }

  render() {
    const { history, isStockFetching } = this.props;

    if (history.length > 0) {
      return (
        <Table tableData={history.reverse()} tableHeaders={tableHeaders} />
      );
    }

    if (isStockFetching) {
      return <Loading />;
    } else {
      return <NoStockInPortfolio />;
    }
  }
}

const mapStateToProps = state => {
  const dataType = "history";

  return {
    history: getStockList(state, dataType),
    isStockFetching: getIsStockFetching(state, dataType),
    errorMessage: getStockErrorMessage(state, dataType)
  };
};

export default connect(mapStateToProps, { fetchStock })(History);
