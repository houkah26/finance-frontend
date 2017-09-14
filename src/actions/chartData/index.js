import axios from "axios";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../types.js";
import chartDataTypes from "../../components/chart/chartDataTypes";
import { AV_API_URL, AV_API_KEY } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsChartDataFetching } from "../../reducers/index";

//= =====================
// ChartData Action Creators
//= =====================
export const fetchChartData = (stockSymbol, dataTypeRequested) => (
  dispatch,
  getState
) => {
  if (getIsChartDataFetching(getState())) {
    return;
  }

  dispatch({
    type: FETCH_CHART_DATA_REQUEST
  });

  const { seriesType, dataInterval, size } = chartDataTypes[dataTypeRequested];

  axios
    .get(
      `${AV_API_URL}function=${seriesType}&symbol=${stockSymbol}&interval=${dataInterval}&outputsize=${size}&apikey=${AV_API_KEY}`
    )
    .then(response => {
      dispatch({
        type: FETCH_CHART_DATA_SUCCESS,
        payload: response.data,
        dataTypeRequested
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
