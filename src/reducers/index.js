import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import quoteReducer, * as fromQuote from "./quoteReducer";
import chartDataReducer, * as fromChartData from "./chartDataReducer";
import createStockList, * as fromStock from "./createStockList";

const stock = combineReducers({
  portfolio: createStockList("portfolio"),
  history: createStockList("history")
});

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  form: formReducer,
  stock,
  quote: quoteReducer(),
  chartData: chartDataReducer()
});

// Stock Selectors ----------------------------------------
export const getStockList = (state, listType) =>
  fromStock.getList(state.stock[listType]);

export const getIsStockFetching = (state, listType) =>
  fromStock.getIsFetching(state.stock[listType]);

export const getStockErrorMessage = (state, listType) =>
  fromStock.getErrorMessage(state.stock[listType]);

export const getStockTotalValue = (state, listType) =>
  fromStock.getTotalValue(state.stock[listType]);

// Quote Selectors ----------------------------------------
export const getQuoteSymbol = state => fromQuote.getSymbol(state.quote);
export const getQuotePrice = state => fromQuote.getPrice(state.quote);
export const getQuoteName = state => fromQuote.getName(state.quote);
export const getIsQuoteFetching = state => fromQuote.getIsFetching(state.quote);

export const getQuoteErrorMessage = state =>
  fromQuote.getErrorMessage(state.quote);

// Chart Data Selectors ----------------------------------------
export const getChartDataData = state => fromChartData.getData(state.chartData);
export const getChartDataDate = state => fromChartData.getDate(state.chartData);
export const getIsChartDataFetching = state =>
  fromChartData.getIsFetching(state.chartData);

export const getChartDataErrorMessage = state =>
  fromChartData.getErrorMessage(state.chartData);
