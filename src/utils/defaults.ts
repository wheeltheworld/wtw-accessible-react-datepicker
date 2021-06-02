import { StyleConfig } from "../types/StyleConfig";
import { Tuple } from "../types/Tuple";

export const months: Tuple<string, 12> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days: Tuple<string, 7> = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

export const styles: StyleConfig = {
  background: "",
  between: "",
  disabled: "",
  font: "",
  normal: "",
  selected: "",
  custom: "",
};
