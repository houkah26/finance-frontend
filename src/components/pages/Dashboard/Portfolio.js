import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchStock } from "../../../actions/stock";
import {
  getStockList,
  getIsStockFetching,
  getStockErrorMessage,
  getStockTotalValue
} from "../../../reducers";

import Loading from "../../loading";
import Table from "../../table";
import NoStockInPortfolio from "./NoStockInPortfolio";

const tableHeaders = [
  { name: "Symbol", key: "stockSymbol" },
  { name: "Name", key: "stockName" },
  { name: "Shares", key: "totalShares" },
  { name: "Price Per Share ($)", key: "price", sortKey: "priceNum" },
  { name: "Total Value ($)", key: "total", sortKey: "totalNum" }
];

class Portfolio extends Component {
  componentDidMount() {
    this.props.fetchStock("portfolio");
  }

  render() {
    const { portfolio, totalValue, isStockFetching } = this.props;

    if (portfolio.length > 0) {
      const tableFooter = [null, null, null, "Total", totalValue.toFixed(2)];
      return (
        <Table
          tableData={portfolio}
          tableHeaders={tableHeaders}
          tableFooter={tableFooter}
        />
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
  const dataType = "portfolio";

  return {
    portfolio: getStockList(state, dataType),
    totalValue: getStockTotalValue(state, dataType),
    isStockFetching: getIsStockFetching(state, dataType),
    errorMessage: getStockErrorMessage(state, dataType)
  };
};

export default connect(mapStateToProps, { fetchStock })(Portfolio);
