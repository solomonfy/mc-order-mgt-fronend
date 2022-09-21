const calculateDateDifference = () => {
  var now = new Date();
  var endOfYear = new Date(now.getFullYear(), 12, 0);

  var diff = endOfYear - now; //in milliseconds
  var oneDay = 1000 * 60 * 60 * 24; //in milliseconds
  var daysInDecimalPlace = (diff / oneDay).toFixed(2);
  var date = Math.floor(daysInDecimalPlace);
  var hrsInDecimal = (
    (24 * Math.floor(daysInDecimalPlace.toString().split(".")[1])) /
    100
  ).toFixed(2);
  var hrs = Math.floor(hrsInDecimal);
  var minInDecimal = (Math.floor(hrsInDecimal.toString().split(".")[1]) * 0.6).toFixed(2);
  var min = Math.floor(minInDecimal);
  var secInDecimal = (minInDecimal.toString().split(".")[1] * 6).toFixed(2);
  var sec = Math.floor(secInDecimal);

  return `${date} day${labelOnCount(date)} ${hrs} hour${labelOnCount(
    hrs
  )} ${min} minute${labelOnCount(min)} ${sec} second${labelOnCount(sec)}`;
};

const labelOnCount = (count) => {
  return count > 1 ? "s" : "";
};

export default calculateDateDifference;
