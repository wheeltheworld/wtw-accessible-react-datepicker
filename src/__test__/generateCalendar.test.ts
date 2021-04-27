import { generateMonthCalendar } from "../utils/funcs/generateCalendar";

describe("generateMonthCalendar()", () => {
  it("should return the correct calendar with some date", () => {
    const input = new Date(2021, 4, 23);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 4,
      calendar: [
        [25, 26, 27, 28, 29, 30, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, 1, 2, 3, 4, 5],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = new Date(2021, 5, 14);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 5,
      calendar: [
        [30, 31, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 1, 2, 3],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = new Date(2021, 10, 23);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 10,
      calendar: [
        [31, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 1, 2, 3, 4],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = new Date(2027, 1, 2);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 1,
      calendar: [
        [31, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 1, 2, 3, 4, 5, 6],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = new Date(2001, 0, 23);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 0,
      calendar: [
        [31, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, 1, 2, 3],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
});
