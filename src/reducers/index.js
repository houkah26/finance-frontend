import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import createStockList, * as fromStock from "./createStockList";

const stock = combineReducers({
  portfolio: createStockList("portfolio"),
  history: createStockList("history")
});

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  form: formReducer,
  stock
});

export const getStockList = (state, listType) =>
  fromStock.getList(state.stock[listType]);

export const getIsStockFetching = (state, listType) =>
  fromStock.getIsFetching(state.stock[listType]);

export const getStockErrorMessage = (state, listType) =>
  fromStock.getErrorMessage(state.stock[listType]);

export const getStockTotalValue = (state, listType) =>
  fromStock.getTotalValue(state.stock[listType]);
