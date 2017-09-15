import axios from "axios";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../types.js";

import { TRADIER_API_KEY } from "../../constants";
import { chartRequestUrl, extractChartDataFromResponse } from "./chartDataAPI";
import errorHandler from "../handlers/errorHandler";
import { getIsChartDataFetching } from "../../reducers/index";

//= =====================
// ChartData Action Creators
//= =====================
export const fetchChartData = (stockSymbol, dataType) => (
  dispatch,
  getState
) => {
  if (getIsChartDataFetching(getState(), dataType)) {
    return;
  }

  dispatch({
    type: FETCH_CHART_DATA_REQUEST,
    dataType
  });

  const headers = {
    headers: { Authorization: TRADIER_API_KEY, Accept: "application/json" }
  };

  axios
    .get(chartRequestUrl(stockSymbol, dataType), headers)
    .then(response => {
      dispatch({
        type: FETCH_CHART_DATA_SUCCESS,
        payload: extractChartDataFromResponse(response, dataType),
        dataType
      });
    })
    .catch(error => {
      errorHandler(dispatch, error, FETCH_CHART_DATA_FAILURE, dataType);
    });
};

export const clearChartData = () => dispatch => {
  dispatch({
    type: CLEAR_CHART_DATA
  });
};
