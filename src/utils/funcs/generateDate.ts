import { Day } from '../../types/Day';

/**
 *  Transform a DatePicker's `Day` into a JS's `Date`
 */
export const generateDate = ({ year, month, day }: Day): Date =>
    // Month in `Day` type are 1-based indexed
    new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
