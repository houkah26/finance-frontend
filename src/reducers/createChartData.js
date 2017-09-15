import { combineReducers } from "redux";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../actions/types.js";

const chartData = dataType => {
  const data = (state = [], action) => {
    if (action.type === CLEAR_CHART_DATA) {
      return [];
    }

    if (action.dataType !== dataType) {
      return state;
    }

    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        const data = action.payload;

        return data;
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
        return [];
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.dataType !== dataType) {
      return state;
    }

    switch (action.type) {
      case FETCH_CHART_DATA_REQUEST:
        return true;
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_SUCCESS:
      case FETCH_CHART_DATA_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = "", action) => {
    if (action.type === CLEAR_CHART_DATA) {
      return [];
    }

    if (action.dataType !== dataType) {
      return state;
    }

    switch (action.type) {
      case FETCH_CHART_DATA_REQUEST:
      case FETCH_CHART_DATA_SUCCESS:
      case CLEAR_CHART_DATA:
        return "";
      case FETCH_CHART_DATA_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({ data, isFetching, errorMessage });
};

export default chartData;

export const getData = state => state.data;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
