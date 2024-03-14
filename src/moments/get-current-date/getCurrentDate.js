import moment from "moment-jalaali";

export const getCurrentDate = (format) => {
let convertTo = format === 'shamsi' ? 'jYYYYjMMjDD' : 'YYYYMMDD'
  const converts = moment();
 
  let convertedDate = moment(converts._d).locale("en").format(convertTo);

  return {date:convertedDate , time:getTime(converts._d)};
};

const getTime = (time)=> {
  return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}