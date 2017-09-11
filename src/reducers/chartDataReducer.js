import { combineReducers } from "redux";
import moment from "moment";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../actions/types.js";
import chartDataTypes from "../components/chart/chartDataTypes";

const formatData = (data, dataTypeRequested) => {
  const {
    axisTickFormat,
    minDataPoints,
    toolTipFormat,
    seriesType
  } = chartDataTypes[dataTypeRequested];
  //  Convert data object to an array of objects
  const dataArray = Object.keys(data).map(key => {
    const date = moment(key);

    return {
      time: date.format("HH:mm"),
      axisLabel: date.format(axisTickFormat),
      toolTipLabel: date.format(toolTipFormat),
      value: parseFloat(data[key]["4. close"])
    };
  });

  //  Start index of chartData
  const startIndex = findStartIndex(seriesType, dataArray, minDataPoints);

  return dataArray.slice(0, startIndex + 1).reverse();
};

const findStartIndex = (seriesType, dataArray, minDataPoints) => {
  switch (seriesType) {
    case "TIME_SERIES_INTRADAY":
      return findStartOfDayIndex(dataArray, minDataPoints);
    case "TIME_SERIES_DAILY":
      return minDataPoints;
    default:
      return dataArray.length - 1;
  }
};

// Start index of data
const findStartOfDayIndex = (dataArray, minDataPoints) => {
  for (let i = minDataPoints; i < dataArray.length; i++) {
    if (dataArray[i].time === "09:30") {
      return i;
    }
  }
};

const chartData = () => {
  const data = (state = null, action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        const data = action.payload;

        const { dataTypeRequested } = action;

        const { dataKey } = chartDataTypes[dataTypeRequested];

        return formatData(data[dataKey], dataTypeRequested);
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
      case FETCH_CHART_DATA_REQUEST:
        return null;
      default:
        return state;
    }
  };

  const dataType = (state = "", action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        return action.dataTypeRequested;
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
      case FETCH_CHART_DATA_REQUEST:
        return "";
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
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

  return combineReducers({ data, dataType, isFetching, errorMessage });
};

export default chartData;

export const getData = state => state.data;
export const getType = state => state.dataType;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
