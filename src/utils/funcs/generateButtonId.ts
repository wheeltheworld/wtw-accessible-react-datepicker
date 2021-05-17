import { Day } from "../../types/Day";

export const generateButtonId = (day: Day) =>
  `${day.day}-${day.month}-${day.year}`;
