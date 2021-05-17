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
