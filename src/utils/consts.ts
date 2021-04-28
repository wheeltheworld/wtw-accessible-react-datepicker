import { Tuple } from "../types";
import { isLeapYear } from "./funcs/isLeapYear";

export const maxDate = (year: number): Tuple<number, 12> => [
  31,
  isLeapYear(year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
