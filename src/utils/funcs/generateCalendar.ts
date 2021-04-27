import { Tuple } from "../../types";
import { maxDate } from "../consts";
import { generateDay } from "./generateDay";

interface Calendar {
  month: number;
  calendar: Tuple<number, 7>[];
}

/**
 * Will return a 2d array with the values of the calendar of a specific month
 * @param date a date with the month to get the calendar
 */
export const generateMonthCalendar = (date: Date): Calendar => {
  const { year, month, day } = generateDay(date);
  const weekDay = date.getDay();
  const days: number[] = [];

  // Add all the days of the month
  for (let i = 1; i <= maxDate(year)[month]; i++) {
    days.push(i);
  }
  // Add missing days at the beggining of the calendar
  let missingSpots = 8 - ((day - weekDay) % 7);
  while (missingSpots >= 7) {
    missingSpots -= 7;
  }
  for (let i = 0; i < missingSpots; i++) {
    days.unshift(-1);
  }

  // We traverse the array so we can create the matrix
  const calendar: number[][] = [];
  let currentRow: number[] = [];
  for (let i = 0; i < days.length; i++) {
    if (currentRow.length === 7) {
      calendar.push(currentRow);
      currentRow = [];
    }
    currentRow.push(days[i]);
  }
  // We add the missing dates at the end of the calendar
  if (currentRow.length) {
    const missing = 8 - currentRow.length;
    for (let i = 1; i < missing; i++) {
      currentRow.push(-1);
    }
    calendar.push(currentRow);
  }
  return {
    month,
    calendar: calendar as Tuple<number, 7>[],
  };
};
