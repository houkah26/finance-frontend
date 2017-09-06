import { combineReducers } from "redux";
import moment from "moment";

import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
  CLEAR_CHART_DATA
} from "../actions/types.js";
import chartDataTypes from "../components/charts/chartDataTypes";

const formatData = (data, dataTypeRequested) => {
  const { dateTimeFormat } = chartDataTypes[dataTypeRequested];

  //  Convert data object to an array of objects
  const dataArray = Object.keys(data).map(key => ({
    dateTime: moment(key).format(dateTimeFormat),
    value: parseFloat(data[key]["4. close"])
  }));

  //  Return a slice of array for desired time range
  const endIndex = dataArray.findIndex(item => item.dateTime === "9:30 AM");
  return dataArray.slice(0, endIndex + 1).reverse();
};

const chartData = () => {
  const data = (state = null, action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        const data = action.payload;
        const interval = data["Meta Data"]["4. Interval"];

        return formatData(
          data[`Time Series (${interval})`],
          action.dataTypeRequested
        );
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
        return null;
      default:
        return state;
    }
  };

  const date = (state = "", action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        return action.payload["Meta Data"]["3. Last Refreshed"].split(" ")[0];
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
        return null;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_REQUEST:
        return true;
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

  return combineReducers({ data, date, isFetching, errorMessage });
};

export default chartData;

export const getData = state => state.data;
export const getDate = state => state.date;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
