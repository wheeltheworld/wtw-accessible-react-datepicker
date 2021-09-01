import { isBetween } from '../../../utils/funcs/isBetween';

describe('isBetween()', () => {
    it('should return true when the day is between the others', () => {
        expect(
            isBetween(
                [
                    { day: 12, month: 3, year: 2021 },
                    { day: 12, month: 4, year: 2021 },
                ],
                { day: 14, month: 3, year: 2021 },
            ),
        ).toBe(true);
    });

    it('should return false when the day is not between the others', () => {
        expect(
            isBetween(
                [
                    { day: 12, month: 3, year: 2021 },
                    { day: 12, month: 4, year: 2021 },
                ],
                { day: 14, month: 1, year: 2021 },
            ),
        ).toBe(false);
    });
});
