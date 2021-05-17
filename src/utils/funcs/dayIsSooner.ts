import { Day } from "../../types/Day";

/**
 * checks if the first day is sooner than the second
 * @param day day to be checked
 * @param secondDay day to be checked against to
 * @returns true or false
 */
export const dayIsSooner = (day: Day, secondDay: Day) => {
  if (day.year < secondDay.year) return true;
  if (day.year > secondDay.year) return false;

  if (day.month < secondDay.month) return true;
  if (day.month > secondDay.month) return false;

  if (day.day < secondDay.day) return true;
  if (day.day > secondDay.day) return false;
  return false;
};
