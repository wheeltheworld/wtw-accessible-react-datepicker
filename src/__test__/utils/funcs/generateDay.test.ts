import { generateDay } from '../../../utils/funcs/generateDay';

describe('generateDay()', () => {
    it('should return the correct day', () => {
        expect(generateDay(new Date(2021, 3, 13))).toEqual({
            day: 13,
            month: 4,
            year: 2021,
        });
    });
    it('should return the day without any timezone side effects', () => {
        const dateInStringForm = new Date('2022-08-05T00:00:00.000Z');
        expect(generateDay(dateInStringForm)).toEqual({
            day: 5,
            month: 8,
            year: 2022,
        });
    });
});
