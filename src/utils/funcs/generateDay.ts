import { Day } from "../../types";

/**
 * Gets a javascript Date and returns a datepicker Day
 */
export const generateDay = (date: Date): Day => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
});
