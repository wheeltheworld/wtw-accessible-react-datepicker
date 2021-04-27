import { Day, Tuple } from "../../types";

export const isBetween = (
  selected: Tuple<Day | null, 2>,
  { day, month, year }: Day
) => {
  if (!selected[0] || !selected[1]) return false;

  return (
    new Date(selected[0]?.year, selected[0]?.month, selected[0]?.day) <
      new Date(year, month, day) &&
    new Date(selected[1]?.year, selected[1]?.month, selected[1]?.day) >
      new Date(year, month, day)
  );
};
