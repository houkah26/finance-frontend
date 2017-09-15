import moment from "moment";
import { TRADIER_API_URL } from "../../constants";

export const chartParamsByDataType = {
  // https://developer.tradier.com/documentation/markets/get-timesales
  intraDay: {
    typeUrl: "/v1/markets/timesales",
    interval: "5min",
    startDate: moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD"),
    sessionFilter: "open",
    dataKey: "series",
    dataSubKey: "data",
    dateTimeKey: "time"
  },
  // https://developer.tradier.com/documentation/markets/get-history
  daily: {
    typeUrl: "/v1/markets/history",
    interval: "daily",
    startDate: moment()
      .subtract(35, "years")
      .format("YYYY-MM-DD"),
    sessionFilter: null,
    dataKey: "history",
    dataSubKey: "day",
    dateTimeKey: "date"
  }
};

export const chartRequestUrl = (symbol, type) => {
  const { typeUrl, interval, startDate, sessionFilter } = chartParamsByDataType[
    type
  ];

  const session_filter = sessionFilter
    ? `&session_filter=${sessionFilter}`
    : "";

  return `${TRADIER_API_URL}${typeUrl}?symbol=${symbol}&interval=${interval}&start=${startDate}${session_filter}`;
};

export const extractChartDataFromResponse = (response, type) => {
  const { dataKey, dataSubKey } = chartParamsByDataType[type];

  if (!response.data[dataKey]) {
    throw new Error("Invalid stock symbol.");
  }

  return response.data[dataKey][dataSubKey];
};
