import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchStock } from "../../../actions/stock";
import {
  getStockList,
  getIsStockFetching,
  getStockErrorMessage
} from "../../../reducers";

import Loading from "../../loading";
import SellStockForm from "../../../components/forms/SellStockForm";
import NoStockInPortfolio from "./NoStockInPortfolio";

class SellStock extends Component {
  componentDidMount() {
    this.props.fetchStock("portfolio");
  }

  render() {
    const { portfolio } = this.props;

    if (portfolio === null) {
      return <Loading />;
    } else if (portfolio.length === 0) {
      return <NoStockInPortfolio />;
    } else {
      return <SellStockForm portfolio={portfolio} />;
    }
  }
}

const mapStateToProps = state => {
  const listType = "portfolio";

  return {
    portfolio: getStockList(state, listType),
    isStockFetching: getIsStockFetching(state, listType),
    errorMessage: getStockErrorMessage(state, listType)
  };
};

export default connect(mapStateToProps, { fetchStock })(SellStock);
