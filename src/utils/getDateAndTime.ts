import { dateType, timeType } from "../Components/OrderInterface";

const getDateAndTime = (): {date: dateType, time: timeType} => {
    const today = new Date();
    const date: dateType =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time: timeType =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      return {date, time}
}

export default getDateAndTime;