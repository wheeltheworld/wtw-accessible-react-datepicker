import { Day } from "../../types";

export const generateDay = (date: Date): Day => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
});
