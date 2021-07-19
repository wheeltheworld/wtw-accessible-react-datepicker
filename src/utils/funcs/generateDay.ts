import { Day } from '../../types/Day';

/**
 * Gets a javascript Date and returns a datepicker Day
 */
export const generateDay = (date: Date): Day => ({
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});
