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
    const { portfolio, isStockFetching } = this.props;

    if (isStockFetching && portfolio === null) {
      return <Loading />;
    } else if (portfolio.length === 0) {
      return <NoStockInPortfolio />;
    } else {
      return <SellStockForm portfolio={portfolio} />;
    }
  }
}

const mapStateToProps = state => {
  const dataType = "portfolio";

  return {
    portfolio: getStockList(state, dataType),
    isStockFetching: getIsStockFetching(state, dataType),
    errorMessage: getStockErrorMessage(state, dataType)
  };
};

export default connect(mapStateToProps, { fetchStock })(SellStock);
