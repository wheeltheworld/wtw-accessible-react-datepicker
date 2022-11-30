import { Day } from '../../../types/Day';
import { generateDay } from '../../../utils/funcs/generateDay';

describe('generateDay', () => {
    const year = 2021;
    const month = 11;
    const day = 31;
    const JSDate = new Date(year, month, day);

    let result: Day;

    beforeEach(() => {
        result = generateDay(JSDate);
    });

    it('should return a Day object', () => {
        expect(result).toMatchObject(
            expect.objectContaining({
                year: expect.any(Number),
                month: expect.any(Number),
                day: expect.any(Number),
            }),
        );
    });
    it('should return the correct day', () => {
        expect(result).toEqual({ day, month: month + 1, year });
    });
});
