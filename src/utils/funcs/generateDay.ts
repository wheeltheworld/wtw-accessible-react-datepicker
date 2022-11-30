import { Day } from '../../types/Day';

/**
 * Transform a JS's `Date` into a DatePicker's `Day`
 */
export const generateDay = (date: Date): Day => ({
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
});
