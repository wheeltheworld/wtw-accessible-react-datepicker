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
}
