import { Day } from '../../types/Day';

/**
 * Transform a DatePicker's `Day` into a JS's `Date`.
 *
 * UTC time was used to ensure resulting JS's `Date` represent the beginning of the
 * day. Please use UTC-equivalent JSDate's methods on the resulting `Date`.
 * Otherwise timezone related bugs may appear.
 */
export const generateDate = ({ year, month, day }: Day): Date =>
    // Month in `Day` type are 1-based indexed
    new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
