import { createContext } from "react";
import { Day, SelectedDates } from "..";
import { DatePickerProps } from "../DatePicker";
import { days, months, styles } from "./defaults";
import { generateDay } from "./funcs/generateDay";
import { useDateSelector } from "./hooks/useDateSelector";

type Context = Required<Pick<DatePickerProps, "days" | "months" | "styles">> & {
  minDate: Day | null;
  maxDate: Day | null;
  selected: SelectedDates;
  onSelect: ReturnType<typeof useDateSelector>["addDate"];
  hover: Day | null;
  setHover: ReturnType<typeof useDateSelector>["setHovered"];
  focusable: string;
  setFocusable: ReturnType<typeof useDateSelector>["setFocusable"];
  isMultiple: boolean;
};

export const datepickerCtx = createContext<Context>({
  minDate: null,
  maxDate: null,
  days: days,
  months: months,
  styles: styles,
  selected: [null, null],
  focusable: "",
  hover: generateDay(new Date()),
  onSelect: () => {},
  setFocusable: () => {},
  setHover: () => {},
  isMultiple: true,
});
