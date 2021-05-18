import { Day } from "../../types/Day";
import { generateDate } from "./generateDate";

/**
 * Returns the difference between two datepicker Days
 */
export const differenceBetweenDays = (day1: Day | null, day2: Day | null) => {
  if (!day1 || !day2) return 0;
  const diffTime = Math.abs(
    generateDate(day1).valueOf() - generateDate(day2).valueOf()
  );
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
