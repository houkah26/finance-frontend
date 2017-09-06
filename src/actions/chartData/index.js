import axios from "axios";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../types.js";
import { AV_API_URL, AV_API_KEY } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsChartDataFetching } from "../../reducers/index";

//= =====================
// ChartData Action Creators
//= =====================
export const fetchChartData = (stockSymbol, dataType, interval, size) => (
  dispatch,
  getState
) => {
  if (getIsChartDataFetching(getState())) {
    return;
  }

  dispatch({
    type: FETCH_CHART_DATA_REQUEST
  });

  axios
    .get(
      `${AV_API_URL}function=${dataType}&symbol=${stockSymbol}&interval=${interval}&outputsize=${size}&apikey=${AV_API_KEY}`
    )
    .then(response => {
      dispatch({
        type: FETCH_CHART_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log("Chart Data:", error);

      errorHandler(dispatch, error.response, FETCH_CHART_DATA_FAILURE);
    });
};

export const clearChartData = () => dispatch => {
  dispatch({
    type: CLEAR_CHART_DATA
  });
};
