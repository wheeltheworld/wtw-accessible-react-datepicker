import { Day } from "../../types/Day";
import { Tuple } from "../../types/Tuple";

export const isSelected = (
  selected: Tuple<Day | null, 2>,
  { day, month, year }: Day
) => {
  if (
    selected[0]?.day === day &&
    selected[0]?.month === month &&
    selected[0]?.year === year
  )
    return [true, false];
  if (
    selected[1]?.day === day &&
    selected[1]?.month === month &&
    selected[1]?.year === year
  )
    return [true, true];

  return [false, false];
};
