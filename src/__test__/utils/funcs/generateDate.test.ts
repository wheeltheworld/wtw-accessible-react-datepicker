import { Day } from '../../../types/Day';
import { generateDate } from '../../../utils/funcs/generateDate';

describe('generateDate', () => {
    const day: Day = { year: 2020, month: 2, day: 2 };
    it('should return JS date', () => {
        const result = generateDate(day);

        expect(result).toBeInstanceOf(Date);
    });
    it('should return correct month', () => {
        const month = 2;
        const result = generateDate({ ...day, month });

        expect(result.getUTCMonth()).toBe(month - 1);
    });

    it('should set hour to 00', () => {
        const result = generateDate(day);

        expect(result.getUTCHours()).toBe(0);
    });
});
