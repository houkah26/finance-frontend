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
    minDataPoints: (4*6.5*60) / 30, // min 4 days
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
    minDataPoints: 52*5-7,
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

