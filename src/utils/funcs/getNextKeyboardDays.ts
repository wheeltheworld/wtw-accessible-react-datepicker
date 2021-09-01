import { Day } from '../../types/Day';
import { generateDate } from './generateDate';
import { generateDay } from './generateDay';

type DayChangeHandler = (day: Day) => Day;

export const getRightDay: DayChangeHandler = (day) => {
    return generateDay(generateDate({ ...day, day: day.day + 1 }));
};

export const getLeftDay: DayChangeHandler = (day) => {
    return generateDay(generateDate({ ...day, day: day.day - 1 }));
};

export const getUpDay: DayChangeHandler = (day) => {
    return generateDay(generateDate({ ...day, day: day.day - 7 }));
};

export const getDownDay: DayChangeHandler = (day) => {
    return generateDay(generateDate({ ...day, day: day.day + 7 }));
};
