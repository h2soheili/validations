import moment from "moment-jalaali";
import { getTime } from "../moment.utils"

export const addToShamsi = (date, object) => {

  let format = 'jYYYYjMMjDD';

  const converts = moment(date, format);
  let currentTime = new Date()

  let hours = object?.hours ? object.hours : 0
  let minutes = object?.minutes ? object.minutes : 0
  let seconds = object?.seconds ? object.seconds : 0

  ;(converts._d).setHours(currentTime.getHours() + hours)
  ;(converts._d).setMinutes(currentTime.getMinutes() + minutes)
  ;(converts._d).setSeconds(currentTime.getSeconds() + seconds)
 
  let convertedDate = moment(converts._d).locale("en").add(object).format(format);

  return {date : convertedDate ,  time : getTime(converts._d)}
}; 
