import React, { useMemo } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "./utils/funcs/generateCalendar";
import { Day as IDay, Tuple } from "./types";
import { days } from "./utils/defaults";
import { generateButtonId } from "./utils/funcs/generateButtonId";
import Day from "./Day";
import {
  getDownDay,
  getLeftDay,
  getRightDay,
  getUpDay,
} from "./utils/funcs/getNextKeyboardDays";

const Keys = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
};

interface DaysProps {
  date: Date;
  months: Tuple<string, 12>;
  onSelect: (day: IDay) => void;
  selected: Tuple<IDay | null, 2>;
  hover: IDay | null;
  setHover: (day: IDay | null) => void;
  focusable: string;
  setFocusable: (str: string) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
`;

const WeekDay = styled.p`
  color: #949494;
`;

const Calendar: React.FC<DaysProps> = ({
  date,
  onSelect,
  months,
  selected,
  setHover,
  hover,
  focusable,
  setFocusable,
}) => {
  const calendar = useMemo(() => generateMonthCalendar(date), [date]);
  const month = useMemo(() => calendar.month, [calendar]);
  const year = useMemo(() => date.getFullYear(), [date]);

  const handleKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    day: number
  ) => {
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
    const next = document.getElementById(id);
    if (next) {
      setFocusable(id);
      next.focus();
    }
  };

  return (
    <div role='grid' aria-label={`${months[month]}'s calendar`}>
      <Grid>
        {days.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </Grid>
      <Grid>
        {calendar.calendar.map((day, i) => (
          <Day
            months={months}
            year={year}
            month={month}
            day={day}
            key={i + generateButtonId({ day, month, year })}
            focusable={focusable}
            handleKey={handleKey}
            onSelect={onSelect}
            setHover={setHover}
            setFocusable={setFocusable}
            hover={hover}
            selected={selected}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Calendar;
