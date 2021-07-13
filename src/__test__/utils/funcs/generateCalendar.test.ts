import { generateMonthCalendar } from "../../../utils/funcs/generateCalendar";

describe("generateMonthCalendar()", () => {
  it("should return the correct calendar with some date", () => {
    const input = { year: 2021, month: 4, day: 23 };
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 4,
      calendar: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = { year: 2021, month: 5, day: 14 };
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 5,
      calendar: [
        -1,
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = { year: 2021, month: 10, day: 23 };
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 10,
      calendar: [
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = { year: 2027, month: 1, day: 2 };
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 1,
      calendar: [
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
  it("should return the correct calendar with some date", () => {
    const input = { year: 2001, month: 0, day: 23 };
    const res: ReturnType<typeof generateMonthCalendar> = {
      month: 0,
      calendar: [
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ],
    };

    expect(generateMonthCalendar(input)).toEqual(res);
  });
});
