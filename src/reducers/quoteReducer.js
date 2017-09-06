import { combineReducers } from "redux";
import { round } from "lodash";

import {
  FETCH_QUOTE_REQUEST,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAILURE,
  CLEAR_QUOTE
} from "../actions/types.js";

const quote = () => {
  const result = (state = {}, action) => {
    switch (action.type) {
      case FETCH_QUOTE_SUCCESS:
        const data = action.payload;

        return {
          symbol: data.stockSymbol,
          price: round(data.price, 2),
          name: data.stockName
        };
      case CLEAR_QUOTE:
      case FETCH_QUOTE_FAILURE:
        return {};
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case FETCH_QUOTE_REQUEST:
        return true;
      case FETCH_QUOTE_SUCCESS:
      case FETCH_QUOTE_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = "", action) => {
    switch (action.type) {
      case FETCH_QUOTE_REQUEST:
      case FETCH_QUOTE_SUCCESS:
      case CLEAR_QUOTE:
        return "";
      case FETCH_QUOTE_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({ result, isFetching, errorMessage });
};

export default quote;

export const getSymbol = state => state.result.symbol;
export const getPrice = state => state.result.price;
export const getName = state => state.result.name;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
