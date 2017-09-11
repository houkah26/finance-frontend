const tradingHoursPerDay = 6.5;

export default {
  day: {
    seriesType: "TIME_SERIES_INTRADAY",
    dataInterval: "5min",
    dataKey: "Time Series (5min)",
    size: "compact",
    axisTickFormat: "h:mm A",
    toolTipFormat: "h:mm A",
    minDataPoints: 0,
    axisInterval: 5
  },
  week: {
    seriesType: "TIME_SERIES_INTRADAY",
    dataInterval: "30min",
    dataKey: "Time Series (30min)",
    size: "compact",
    axisTickFormat: "MMM D",
    toolTipFormat: "ddd, MMM D h:mm A",
    // min 4 days at 14 data points per day
    minDataPoints: 4 * (tradingHoursPerDay * (60 / 30) + 1),
    axisInterval: 13
  },
  month: {
    seriesType: "TIME_SERIES_DAILY",
    dataInterval: "Daily",
    dataKey: "Time Series (Daily)",
    size: "compact",
    axisTickFormat: "MMM D",
    toolTipFormat: "MMM D, YYYY",
    minDataPoints: 22,
    axisInterval: 4
  },
  year: {
    seriesType: "TIME_SERIES_DAILY",
    dataInterval: "Daily",
    dataKey: "Time Series (Daily)",
    size: "full",
    axisTickFormat: "MMM YYYY",
    toolTipFormat: "MMM D, YYYY",
    minDataPoints: 52 * 5 - 7,
    axisInterval: 20
  },
  max: {
    seriesType: "TIME_SERIES_WEEKLY",
    dataInterval: "Weekly",
    dataKey: "Weekly Time Series",
    size: "full",
    axisTickFormat: "YYYY",
    toolTipFormat: "MMM D, YYYY",
    minDataPoints: null,
    axisInterval: 52
  }
};
