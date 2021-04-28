import { Day } from "../../types";

export const generateButtonId = (day: Day) =>
  `${day.day}-${day.month}-${day.year}`;
