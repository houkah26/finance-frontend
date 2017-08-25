import { combineReducers } from "redux";
import { round } from "lodash";
import moment from "moment";

import {
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_FAILURE
} from "../actions/types.js";

// Round dollar amounts and store as number and string
const mapPortfolio = portfolio => {
  return portfolio.map(stock => ({
    ...stock,
    priceNum: stock.price,
    totalNum: stock.total,
    price: round(stock.price, 2).toFixed(2),
    total: round(stock.total, 2).toFixed(2)
  }));
};

// Add created at and total value to history, and format prices to two decimal places
const mapHistory = history => {
  return history.map(transaction => ({
    ...transaction,
    // set Unix time stamp for sorting
    unixTimestamp: moment(transaction.createdAt).unix(),

    // convert created at date/time to "M/D/YY, X:XX AM/PM"
    createdAt: moment(transaction.createdAt).format("M/D/YY, LT"),

    // store numbers for sorting
    priceNum: transaction.price,
    totalValueNum: transaction.price * transaction.shares,

    // convert prices to two decimal places
    totalValue: round(transaction.price * transaction.shares, 2).toFixed(2),
    price: round(transaction.price, 2).toFixed(2)
  }));
};

// Calculate Total Value of Entire Portfolio
export const calcTotalValue = portfolio => {
  let total = 0;
  portfolio.forEach(stock => {
    total += stock.total;
  });
  return round(total, 2);
};

const stock = listType => {
  const list = (state = [], action) => {
    if (action.type !== FETCH_STOCK_SUCCESS || listType !== action.listType) {
      return state;
    }

    switch (listType) {
      case "portfolio":
        return mapPortfolio(action.payload);
      case "history":
        return mapHistory(action.payload);
      default:
        return state;
    }
  };

  // Store total value, portfolio only
  const totalValue = (state = null, action) => {
    return action.type === FETCH_STOCK_SUCCESS && action.listType === listType
      ? calcTotalValue(action.payload)
      : state;
  };

  const isFetching = (state = false, action) => {
    if (action.listType !== listType) {
      return state;
    }

    switch (action.type) {
      case FETCH_STOCK_REQUEST:
        return true;
      case FETCH_STOCK_SUCCESS:
      case FETCH_STOCK_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.listType !== listType) {
      return state;
    }

    switch (action.type) {
      case FETCH_STOCK_REQUEST:
      case FETCH_STOCK_SUCCESS:
        return null;
      case FETCH_STOCK_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({ list, isFetching, errorMessage, totalValue });
};

export default stock;

export const getList = state => state.list;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.getErrorMessage;
export const getTotalValue = state => state.totalValue;
