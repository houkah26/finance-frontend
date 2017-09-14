import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import quoteReducer, * as fromQuote from "./quoteReducer";
// import chartDataReducer, * as fromChartData from "./chartDataReducer";
import createStockData, * as fromStock from "./createStockData";
import createChartData, * as fromChartData from "./createChartData";

const stock = combineReducers({
  portfolio: createStockData("portfolio"),
  history: createStockData("history")
});

const chartData = combineReducers({
  intraDay: createChartData("intraDay"),
  daily: createChartData("daily")
});

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  form: formReducer,
  stock,
  quote: quoteReducer(),
  chartData
});

// Stock Selectors ----------------------------------------
export const getStockList = (state, dataType) =>
  fromStock.getList(state.stock[dataType]);

export const getIsStockFetching = (state, dataType) =>
  fromStock.getIsFetching(state.stock[dataType]);

export const getStockErrorMessage = (state, dataType) =>
  fromStock.getErrorMessage(state.stock[dataType]);

export const getStockTotalValue = (state, dataType) =>
  fromStock.getTotalValue(state.stock[dataType]);

// Quote Selectors ----------------------------------------
export const getQuoteSymbol = state => fromQuote.getSymbol(state.quote);
export const getQuotePrice = state => fromQuote.getPrice(state.quote);
export const getQuoteName = state => fromQuote.getName(state.quote);
export const getIsQuoteFetching = state => fromQuote.getIsFetching(state.quote);

export const getQuoteErrorMessage = state =>
  fromQuote.getErrorMessage(state.quote);

// Chart Data Selectors ----------------------------------------
export const getChartDataData = (state, dataType) =>
  fromChartData.getData(state.chartData[dataType]);
export const getIsChartDataFetching = (state, dataType) =>
  fromChartData.getIsFetching(state.chartData[dataType]);

export const getChartDataErrorMessage = (state, dataType) =>
  fromChartData.getErrorMessage(state.chartData[dataType]);
