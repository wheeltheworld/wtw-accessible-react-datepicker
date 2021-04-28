import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import { months as defaultMonths, days as defaultDays } from "./utils/defaults";
import Header from "./Header";
import { StyleConfig, Tuple } from "./types";
import { useDateSelector } from "./utils/hooks/useDateSelector";
import FocusTrap from "focus-trap-react";

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  padding 17px 25px;
  display: flex;
  flex-direction: column;
  max-width: 700px;

  & > * {
    font-family: sans-serif;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Close = styled.button`
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  font-size: 16px;
  padding: 9px 25px;
`;

export interface DatePickerProps {
  isOpen: boolean;
  handleToggle: () => void;
  months?: Tuple<string, 12>;
  days?: Tuple<string, 7>;
  dateSelector: ReturnType<typeof useDateSelector>;
  styles: StyleConfig;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  handleToggle,
  dateSelector: {
    selected,
    addDate,
    hovered,
    setHovered,
    focusable,
    setFocusable,
  },
  styles,
  ...props
}) => {
  const [date, setDate] = useState(new Date());
  const onNext = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  }, [date]);

  const onPrevious = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  }, [date]);

  const months = useMemo(() => props.months || defaultMonths, [props.months]);

  const days = useMemo(() => props.days || defaultDays, [props.days]);

  const currentMonths = useMemo((): Tuple<string, 2> => {
    const month = date.getMonth();
    return [
      `${months[month]} ${date.getFullYear()}`,
      `${months[month === 11 ? 0 : month + 1]} ${date.getFullYear()}`,
    ];
  }, [months, date]);

  const secondDate = useMemo(
    () => new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    [date]
  );

  const commonCalendar = {
    onSelect: addDate,
    months: months,
    selected: selected,
    hover: hovered,
    setHover: setHovered,
    focusable: focusable,
    setFocusable: setFocusable,
  };

  return isOpen ? (
    <FocusTrap>
      <Container role='dialog'>
        <Header
          months={currentMonths}
          onNext={onNext}
          onPrevious={onPrevious}
        />
        <Flex>
          <Calendar
            date={date}
            {...commonCalendar}
            styles={styles}
            days={days}
          />
          <Calendar
            date={secondDate}
            {...commonCalendar}
            styles={styles}
            days={days}
          />
        </Flex>
        <Close onClick={handleToggle}>Close</Close>
      </Container>
    </FocusTrap>
  ) : (
    <> </>
  );
};

export default DatePicker;
