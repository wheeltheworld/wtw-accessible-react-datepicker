import { Day } from "../../types";

/**
 *  gets a datepicker Day and returns a javascript Date
 */
export const generateDate = (day: Day) =>
  new Date(day.year, day.month, day.day);
