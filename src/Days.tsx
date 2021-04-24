import React, { useMemo } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "./generateCalendar";

interface DaysProps {
  date: Date;
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

const Days: React.FC<DaysProps> = ({ date }) => {
  const calendar = useMemo(() => generateMonthCalendar(date), [date]);
  console.log(calendar);
  return (
    <Grid>
      {calendar.calendar.map((row, i) =>
        row.map((day) => {
          const disabled =
            (i === 0 && day > 7) || (i === row.length - 1 && i < 7);
          return (
            <Day key={day} disabled={disabled} aria-disabled={disabled}>
              {day}
            </Day>
          );
        })
      )}
    </Grid>
  );
};

export default Days;
