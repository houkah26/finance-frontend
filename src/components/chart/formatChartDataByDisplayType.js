import chartDisplayTypes from "./chartDisplayTypes";
import { chartParamsByDataType } from "../../actions/chartData/chartDataAPI";
import moment from "moment";

const findStartIndex = (chartData, selectedChartDisplayType) => {
  switch (selectedChartDisplayType) {
    case "day":
      return findStartOfDayIndex(chartData);
    case "week":
      return 0;
    case "month":
      return chartData.length - 23;
    case "year":
      return chartData.length - 252;
    case "max":
      return 0;
    default:
      return 0;
  }
};

// Find and return the index of the start of the most current trading day
const findStartOfDayIndex = chartData => {
  for (let i = chartData.length - 1; i >= 0; i--) {
    // time format = "2017-09-07T09:30:00"
    if (chartData[i].time.split("T")[1] === "09:30:00") {
      return i;
    }
  }
};

const formatChartDataByDisplayType = (chartData, selectedChartDisplayType) => {
  const startIndex = findStartIndex(chartData, selectedChartDisplayType);

  const {
    dataInterval,
    axisTickFormat,
    toolTipFormat,
    dataType
  } = chartDisplayTypes[selectedChartDisplayType];
  const { dateTimeKey } = chartParamsByDataType[dataType];

  const formattedDataArray = [];
  for (let i = startIndex; i < chartData.length; i += dataInterval) {
    const dateTime = moment(chartData[i][dateTimeKey]);

    formattedDataArray.push({
      ...chartData[i],
      axisLabel: dateTime.format(axisTickFormat),
      toolTipLabel: dateTime.format(toolTipFormat)
    });
  }

  // Add closing data for 4:00 pm at end of day array after 3:55 pm
  const lastIndex = formattedDataArray.length - 1;
  const lastDataPoint = formattedDataArray[lastIndex];
  if (selectedChartDisplayType === "day" && lastDataPoint.time === "3:55pm") {
    formattedDataArray.push({
      open: lastDataPoint.close,
      close: lastDataPoint.close,
      axisLabel: "4:00 PM",
      toolTipLabel: "4:00 PM",
      lastPointOfIntraDay: true
    });
  }

  return formattedDataArray;
};

export default formatChartDataByDisplayType;
