import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const SelectedStockInfo = ({ selectedStock: stock }) =>
  <List divided>
    <List.Item>
      <List.Header>Stock Symbol</List.Header>
      {stock.stockSymbol}
    </List.Item>
    <List.Item>
      <List.Header>Name</List.Header>
      {stock.stockName}
    </List.Item>
    <List.Item>
      <List.Header>Shares Owned</List.Header>
      {stock.totalShares}
    </List.Item>
    <List.Item>
      <List.Header>Current Price</List.Header>
      {`$${stock.price}`}
    </List.Item>
    <List.Item>
      <List.Header>Total Value</List.Header>
      {`$${stock.total}`}
    </List.Item>
  </List>;

SelectedStockInfo.propTypes = {
  selectedStock: PropTypes.shape({
    stockSymbol: PropTypes.string.isRequired,
    stockName: PropTypes.string.isRequired,
    totalShares: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired
  }).isRequired
};

export default SelectedStockInfo;
