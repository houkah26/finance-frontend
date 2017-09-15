const chartDisplayTypes = {
  day: {
    // intraDay returns data every 5mins
    dataType: "intraDay",
    dataInterval: 1,
    axisTickFormat: "h:mm A",
    toolTipFormat: "h:mm A",
    axisInterval: 5
  },
  week: {
    dataType: "intraDay",
    // Every 30mins = 5min * 6
    dataInterval: 6,
    axisTickFormat: "MMM D",
    toolTipFormat: "ddd, MMM D h:mm A",
    axisInterval: 12
  },
  month: {
    dataType: "daily",
    dataInterval: 1,
    axisTickFormat: "MMM D",
    toolTipFormat: "MMM D, YYYY",
    axisInterval: 4
  },
  year: {
    dataType: "daily",
    dataInterval: 1,
    axisTickFormat: "MMM YYYY",
    toolTipFormat: "MMM D, YYYY",
    axisInterval: 20
  },
  max: {
    dataType: "daily",
    dataInterval: 7,
    axisTickFormat: "YYYY",
    toolTipFormat: "MMM D, YYYY",
    axisInterval: 52
  }
};

export default chartDisplayTypes;
