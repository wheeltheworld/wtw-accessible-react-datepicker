import { Day } from "../../types";
import { generateDate } from "./generateDate";

/**
 * Returns the difference between two datepicker Days
 */
export const differenceBetweenDays = (day1: Day, day2: Day) => {
  const diffTime = Math.abs(
    generateDate(day1).getSeconds() - generateDate(day2).getSeconds()
  );
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
