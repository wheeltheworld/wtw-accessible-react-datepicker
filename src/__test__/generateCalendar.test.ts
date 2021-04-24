import { generateMonthCalendar } from "../generateCalendar";

describe("generateMonthCalendar()", () => {
  it("should return the correct calendar with some date", () => {
    const input = new Date(2021, 3, 23);
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 3,
      calendar: [
        [28, 29, 30, 31, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 1],
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });

  it("should return the correct calendar with another date", () => {
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
    console.log(generateMonthCalendar(input));
    expect(generateMonthCalendar(input)).toEqual(res);
  });
});
