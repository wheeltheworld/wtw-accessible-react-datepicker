import { useDateSelector } from "./utils/hooks/useDateSelector";

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

export interface Day {
  month: number;
  day: number;
  year: number;
}

export interface StyleConfig {
  selected: string;
  between: string;
  disabled: string;
  normal: string;
  background: string;
  font: string;

  /**
   * this will add to the datepicker any css you want
   */
  custom?: string;
}

export type SelectedDates = ReturnType<typeof useDateSelector>["selected"];
