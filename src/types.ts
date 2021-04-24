export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

export interface Day {
  month: number;
  day: number;
  year: number;
}
