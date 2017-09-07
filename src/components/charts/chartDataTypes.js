export default {
  day: {
    seriesType: "TIME_SERIES_INTRADAY",
    dataInterval: "5min",
    size: "compact",
    axisTickFormat: "h:mm A",
    toolTipFormat: "h:mm A",
    minDataOffset: 0,
    axisInterval: 5
  },
  week: {
    seriesType: "TIME_SERIES_INTRADAY",
    dataInterval: "30min",
    size: "compact",
    axisTickFormat: "MMM D",
    toolTipFormat: "ddd, MMM D h:mm A",
    minDataOffset: (4*6.5*60) / 30, // min 4 day offset
    axisInterval: 15
  }
};
