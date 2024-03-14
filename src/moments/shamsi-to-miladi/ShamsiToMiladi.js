import moment from "moment-jalaali";

export const shamsiToMiladi = (date) => {
  const converts = moment(date, 'jYYYYjMMjDD');
  let convertedMiladi = moment(converts._d).locale("en").format('YYYYMMDD');
  return convertedMiladi;
};
