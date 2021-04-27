import { Day } from "../../types";

/**
 * checks if the first day is sooner than the second
 * @param day day to be checked
 * @param secondDay day to be checked against to
 * @returns true or false
 */
export const dayIsSooner = (day: Day, secondDay: Day) =>
  new Date(day.year, day.month, day.day) <
  new Date(secondDay.year, secondDay.month, secondDay.day);
