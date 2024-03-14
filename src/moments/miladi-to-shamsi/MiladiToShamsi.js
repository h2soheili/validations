import moment from "moment-jalaali";

export const miladiToShamsi = (date) => {
  const converts = moment(date, 'YYYYMMDD');
  let convertedMiladi = moment(converts._d).locale("en").format('jYYYYjMMjDD');
    return convertedMiladi;
  }; 