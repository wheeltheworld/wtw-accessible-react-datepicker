import { dayIsSooner } from '../../../utils/funcs/dayIsSooner';

describe('dayIsSooner()', () => {
    it('should return true when the first day is sooner than the second', () => {
        expect(dayIsSooner({ day: 12, month: 3, year: 2021 }, { day: 12, month: 4, year: 2021 })).toBe(true);
    });

    it('should return false when the first day is later than the second', () => {
        expect(dayIsSooner({ day: 12, month: 5, year: 2021 }, { day: 11, month: 5, year: 2021 })).toBe(false);
    });

    it('should return false when the two days are the same', () => {
        expect(dayIsSooner({ day: 12, month: 5, year: 2021 }, { day: 12, month: 5, year: 2021 })).toBe(false);
    });
});
