import { Day } from "../../types/Day";
import { maxDate } from "../consts";
import { generateDate } from "./generateDate";

interface Calendar {
  month: number;
  calendar: number[];
}

/**
 * Will return an array with the values of the calendar of a specific month
 * @param date a date with the month to get the calendar
 */
export const generateMonthCalendar = (date: Day): Calendar => {
  const { year, month, day } = date;
  const weekDay = generateDate(date).getDay();
  const days: number[] = [];

  // Add all the days of the month
  for (let i = 1; i <= maxDate(year)[month]; i++) {
    days.push(i);
  }

  // Add missing days at the beggining of the calendar
  let missingSpots = (8 - ((day - weekDay) % 7)) % 7;

  for (let i = 0; i < missingSpots; i++) {
    days.unshift(-1);
  }

  while (days.length < 42) {
    days.push(-1);
  }

  return {
    month,
    calendar: days,
  };
};
