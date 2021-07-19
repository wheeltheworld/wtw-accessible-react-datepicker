import { generateDay } from '../../../utils/funcs/generateDay';

describe('generateDay()', () => {
  it('should return the correct day', () => {
    expect(generateDay(new Date(2021, 3, 13))).toEqual({
      day: 13,
      month: 4,
      year: 2021,
    });
  });
});
