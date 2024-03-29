import React, { useContext, useMemo } from 'react';
import styled from '@emotion/styled';
import { generateMonthCalendar } from './utils/funcs/generateCalendar';
import { Day as IDay } from './types/Day';
import { generateButtonId } from './utils/funcs/generateButtonId';
import Day from './Day';
import { getDownDay, getLeftDay, getRightDay, getUpDay } from './utils/funcs/getNextKeyboardDays';
import { datepickerCtx } from './utils/ctx';
import { Tuple } from './types/Tuple';
import { DatePickerProps } from './DatePicker';

//35 is the number of date spaces that has 5 rows and 7 columns (days of the week)
//After that a new row is needed to store the reminding dates
const numberSpacesCalendar = 35;

const Keys = {
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
};

interface DaysProps extends Required<Pick<DatePickerProps, 'calendarOrientation'>> {
    date: IDay;
    monthIndex: number;
    isMultiple?: boolean;
    currentMonths: Tuple<string, 1 | 2>;
}

const Grid = styled.div<{ days?: boolean; numberDays?: number }>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    ${({ days, numberDays }) =>
        days && numberDays ? `grid-template-rows: repeat(${numberDays > numberSpacesCalendar ? '6' : '5'}, 1fr);` : ''}
    place-items: center;
`;

const WeekDay = styled.p<{ color: string }>`
    color: ${({ color }) => color};
`;

const Month = styled.p<{ calendarOrientation: 'horizontal' | 'vertical' }>`
    font-weight: 700;
    margin: 10px 0 10px 0;
    display: grid;
    font-size: 18px;
    place-items: ${({ calendarOrientation }) => (calendarOrientation === 'horizontal' ? 'start' : 'center')};
`;

const Calendar: React.FC<DaysProps> = ({ date, currentMonths, calendarOrientation, monthIndex }) => {
    const calendar = useMemo(() => generateMonthCalendar(date), [date]);
    const { days, months, styles, setFocusable, onNext, onPrevious } = useContext(datepickerCtx);

    const { month, year } = date;
    const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>, day: number) => {
        if (!Object.values(Keys).includes(e.code)) return;
        e.preventDefault();

        let nextDay: IDay;
        switch (e.code) {
            case Keys.Left:
                nextDay = getLeftDay({ day, month, year });
                break;
            case Keys.Right:
                nextDay = getRightDay({ day, month, year });
                break;
            case Keys.Up:
                nextDay = getUpDay({ day, month, year });
                break;
            case Keys.Down:
                nextDay = getDownDay({ day, month, year });
                break;
            default:
                nextDay = { day, month, year };
        }
        const id = generateButtonId(nextDay);
        if (nextDay.month > month || (nextDay.month === 1 && month === 12)) {
            onNext(id);
        } else if (nextDay.month < month || (nextDay.month === 12 && month === 1)) {
            onPrevious(id);
        }
        setTimeout(() => {
            const next = document.getElementById(id);
            if (next) {
                setFocusable(id);
                next.focus();
            }
        });
    };

    return (
        <div role="grid" aria-label={`${months[month - 1]}'s calendar`}>
            <Month calendarOrientation={calendarOrientation} aria-live="polite">
                {currentMonths[monthIndex]}
            </Month>
            <Grid>
                {days.map((day) => (
                    <WeekDay key={day} color={styles.disabled}>
                        {day}
                    </WeekDay>
                ))}
            </Grid>
            <Grid days numberDays={calendar.calendar.length}>
                {calendar.calendar.map((day, i) => (
                    <Day
                        day={{ day, month, year }}
                        key={i + generateButtonId({ day, month, year })}
                        handleKey={handleKey}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default Calendar;
