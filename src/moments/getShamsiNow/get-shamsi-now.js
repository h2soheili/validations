import moment from "moment-jalaali";

export const getShamsiNow = () => {
  const converts = moment().locale('en').format('jYYYYjMMjDD');
  return converts;
};
