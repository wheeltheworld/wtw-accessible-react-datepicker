import React, { useContext, useMemo } from 'react';
import styled from '@emotion/styled';
import { generateMonthCalendar } from './utils/funcs/generateCalendar';
import { Day as IDay } from './types/Day';
import { generateButtonId } from './utils/funcs/generateButtonId';
import Day from './Day';
import { getDownDay, getLeftDay, getRightDay, getUpDay } from './utils/funcs/getNextKeyboardDays';
import { datepickerCtx } from './utils/ctx';

const Keys = {
  Up: 'ArrowUp',
  Down: 'ArrowDown',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
};

interface DaysProps {
  date: IDay;
}

const Grid = styled.div<{ days?: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${({ days }) => (days ? `grid-template-rows: repeat(6, 1fr);` : '')}
  place-items: center;
`;

const WeekDay = styled.p<{ color: string }>`
  color: ${({ color }) => color};
`;

const Calendar: React.FC<DaysProps> = ({ date }) => {
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
      <Grid>
        {days.map((day) => (
          <WeekDay key={day} color={styles.disabled}>
            {day}
          </WeekDay>
        ))}
      </Grid>
      <Grid days>
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
