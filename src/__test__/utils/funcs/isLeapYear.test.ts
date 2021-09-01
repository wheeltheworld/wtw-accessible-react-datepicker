import { isLeapYear } from '../../../utils/funcs/isLeapYear';

describe('isLeapYear()', () => {
    it('should return true when the year is leap', () => {
        expect(isLeapYear(2020)).toBe(true);
    });

    it('should return false when the year is not leap', () => {
        expect(isLeapYear(2021)).toBe(false);
    });
});
