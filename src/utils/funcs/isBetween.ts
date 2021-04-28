import { Day, Tuple } from "../../types";
import { dayIsSooner } from "./dayIsSooner";

export const isBetween = (selected: Tuple<Day | null, 2>, target: Day) => {
  if (!selected[0] || !selected[1]) return false;

  return dayIsSooner(selected[0], target) && dayIsSooner(target, selected[1]);
};
