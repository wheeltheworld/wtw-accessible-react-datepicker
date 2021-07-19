import { Day } from '../../types/Day';

/**
 *  gets a datepicker Day and returns a javascript Date
 */
export const generateDate = (day: Day) => new Date(day.year, day.month - 1, day.day);
