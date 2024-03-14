var moment = require('moment');

export const getMiladiNow = () => {
  const converts = moment().format('YYYYMMDD');
  return converts;
};
