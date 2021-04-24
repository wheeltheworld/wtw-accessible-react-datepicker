import React, { useMemo } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "./generateCalendar";
import { Day as IDay } from "./types";

interface DaysProps {
  date: Date;
  onSelect: (day: IDay) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.button`
  border: none;
  background: none;
  border-radius: 100%;
  width: 40px;
  height: 40px;

  :not(&[disabled])&:hover,
  &:focus {
    background-color: lightgray;
    outline: none;
  }
`;

const Days: React.FC<DaysProps> = ({ date, onSelect }) => {
  const calendar = useMemo(() => generateMonthCalendar(date), [date]);
  return (
    <Grid>
      {[0, 1, 2, 3, 4, 5]}
      {calendar.calendar.map((row, i) =>
        row.map((day) => {
          const disabled =
            (i === 0 && day > 7) ||
            (i === calendar.calendar.length - 1 && day < 7);
          return (
            <Day
              key={day}
              disabled={disabled}
              aria-disabled={disabled}
              onClick={() =>
                onSelect({
                  day,
                  month: date.getMonth(),
                  year: date.getFullYear(),
                })
              }
            >
              {day}
            </Day>
          );
        })
      )}
    </Grid>
  );
};

export default Days;
