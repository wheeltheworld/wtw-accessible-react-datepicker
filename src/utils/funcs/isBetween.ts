import { Day } from "../../types/Day";
import { SelectedDates } from "../../types/SelectedDates";
import { dayIsSooner } from "./dayIsSooner";

export const isBetween = (selected: SelectedDates, target: Day) => {
  if (!selected[0] || !selected[1]) return false;

  return dayIsSooner(selected[0], target) && dayIsSooner(target, selected[1]);
};
