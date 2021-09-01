import { generateButtonId } from '../../../utils/funcs/generateButtonId';

describe('generateButtonId()', () => {
    it('should return the same id for the same day', () => {
        expect(generateButtonId({ day: 12, month: 3, year: 2020 })).toBe(
            generateButtonId({ day: 12, month: 3, year: 2020 }),
        );
    });

    it('should return different ids for the different days', () => {
        expect(generateButtonId({ day: 12, month: 3, year: 2020 })).not.toBe(
            generateButtonId({ day: 13, month: 3, year: 2020 }),
        );
    });
});
