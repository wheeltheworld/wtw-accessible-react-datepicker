import { Day } from "../../types";
import { maxDate } from "../consts";

type DayChangeHandler = (day: Day) => Day;

export const getRightDay: DayChangeHandler = (day) => {
  if (day.day === maxDate(day.year)[day.month]) {
    return { day: 1, month: day.month + 1, year: day.year };
  }

  return { ...day, day: day.day + 1 };
};

export const getLeftDay: DayChangeHandler = (day) => {
  if (day.day === 1) {
    return {
      day: maxDate(day.year)[day.month - 1],
      month: day.month - 1,
      year: day.year,
    };
  }

  return { ...day, day: day.day - 1 };
};

export const getUpDay: DayChangeHandler = (day) => {
  return { ...day, day: day.day - 7 };
};

export const getDownDay: DayChangeHandler = (day) => {
  return { ...day, day: day.day + 7 };
};
