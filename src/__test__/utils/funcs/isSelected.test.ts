import { isSelected } from '../../../utils/funcs/isSelected';

describe('isSelected()', () => {
    it('should return true when the day is the first selected', () => {
        expect(
            isSelected(
                [
                    { day: 12, month: 3, year: 2021 },
                    { day: 12, month: 4, year: 2021 },
                ],
                { day: 12, month: 3, year: 2021 },
            )[0],
        ).toBe(true);
    });

    it('should return true when the day is the second selected', () => {
        expect(
            isSelected(
                [
                    { day: 12, month: 3, year: 2021 },
                    { day: 12, month: 4, year: 2021 },
                ],
                { day: 12, month: 4, year: 2021 },
            )[0],
        ).toBe(true);
    });

    it('should return false when the day is not selected', () => {
        expect(
            isSelected(
                [
                    { day: 12, month: 3, year: 2021 },
                    { day: 12, month: 4, year: 2021 },
                ],
                { day: 14, month: 1, year: 2021 },
            )[0],
        ).toBe(false);
    });
});
