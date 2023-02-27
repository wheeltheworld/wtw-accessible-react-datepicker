import { Day } from '../../types/Day';

/**
 * Gets a javascript Date and returns a datepicker Day
 */
export const generateDay = (date: Date): Day => ({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
});

export const generateUTCDay = (date: Date): Day => ({
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
});