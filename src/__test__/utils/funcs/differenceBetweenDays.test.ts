import { Day } from '../../../types/Day';
import { differenceBetweenDays } from '../../../utils/funcs/differenceBetweenDays';

describe('differenceBetweenDays', () => {
    it('should return 0 when some parameter is missing', () => {
        const date: Day = { year: 2020, month: 1, day: 15 };

        let result = differenceBetweenDays(date, null);
        expect(result).toBe(0);

        result = differenceBetweenDays(null, date);
        expect(result).toBe(0);
        result = differenceBetweenDays(null, null);
        expect(result).toBe(0);
    });
    it('should work correctly when month is March', () => {
        const year = 2022;
        const month = 3;
        const initDay = 12;
        const diffDay = 3;
        const startDate: Day = { year, month, day: initDay };
        const endDate: Day = { year, month, day: initDay + diffDay };

        const result = differenceBetweenDays(startDate, endDate);

        expect(result).toBe(diffDay);
    });
    it('should work correctly when startDay is older than endDate', () => {
        const year = 2022;
        const month = 3;
        const initDay = 15;
        const diffDay = 3;
        const startDate: Day = { year, month, day: initDay };
        const endDate: Day = { year, month, day: initDay - diffDay };

        const result = differenceBetweenDays(startDate, endDate);

        expect(result).toBe(diffDay);
    });
    it('should work correctly when year is leap year', () => {
        const year = 2020;
        const startDate: Day = { year, month: 2, day: 27 };
        const endDate: Day = { year, month: 3, day: 2 };

        const result = differenceBetweenDays(startDate, endDate);

        expect(result).toBe(4);
    });
    it('should work correctly when years differ', () => {
        const startDate: Day = { year: 2020, month: 12, day: 27 };
        const endDate: Day = { year: 2021, month: 1, day: 2 };

        const result = differenceBetweenDays(startDate, endDate);

        expect(result).toBe(6);
    });
});
