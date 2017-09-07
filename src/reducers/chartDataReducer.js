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
  const { axisTickFormat, minDataOffset, toolTipFormat } = chartDataTypes[dataTypeRequested];
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
  const startIndex = chartDataTypes[dataTypeRequested].seriesType === "TIME_SERIES_INTRADAY" ? findStartOfDatIndex(dataArray, minDataOffset) : minDataOffset;
  // const endIndex = dataArray.findIndex(item => item.axisLabel === "9:30 AM");
  return dataArray.slice(0, startIndex + 1).reverse();
};

// const startDate = (dataTypeRequested) => {
//   switch (dataTypeRequested) {
//     case 'week':
//       return 
//   }
// }

// Start index of data
const findStartOfDatIndex = (dataArray, minDataOffset) => {
  for (let i = minDataOffset; i < dataArray.length; i++) {
    if (dataArray[i].time === "09:30") {
      return i;
    }
  }
}

const chartData = () => {
  const data = (state = null, action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        const data = action.payload;
        const { dataTypeRequested } = action;
        // const metaData = data["Meta Data"]
        // const interval = metaData["4. Interval"];
        const interval = chartDataTypes[dataTypeRequested].dataInterval;
        // const latestDataDate = metaData["3. Last Refreshed"].split(" ")[0] // date in form of yyyy/mm/dd
        return formatData(
          data[`Time Series (${interval})`],
          dataTypeRequested,
        );
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
        return null;
      default:
        return state;
    }
  };

  // const date = (state = "", action) => {
  //   switch (action.type) {
  //     case FETCH_CHART_DATA_SUCCESS:
  //       return action.payload["Meta Data"]["3. Last Refreshed"].split(" ")[0];
  //     case CLEAR_CHART_DATA:
  //     case FETCH_CHART_DATA_FAILURE:
  //       return null;
  //     default:
  //       return state;
  //   }
  // };

  const dataType = (state = "", action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_SUCCESS:
        return action.dataTypeRequested;
      case CLEAR_CHART_DATA:
      case FETCH_CHART_DATA_FAILURE:
        return "";
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

  return combineReducers({ data, dataType, isFetching, errorMessage });
};

export default chartData;

export const getData = state => state.data;
export const getType = state => state.dataType;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
