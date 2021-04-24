import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Days from "./Days";
import { months as defaultMonths } from "./defaults";
import Header from "./Header";
import { Tuple } from "./types";

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid black;
`;

interface DatePickerProps {
  isOpen: boolean;
  handleToggle: () => void;
  months?: Tuple<string, 12>;
  days?: Tuple<string, 7>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  handleToggle,
  ...props
}) => {
  const [date, setDate] = useState(new Date());
  const onNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDay()));
  };

  const onPrevious = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDay()));
  };

  const months = useMemo(() => props.months || defaultMonths, [props.months]);

  const currentMonths: Tuple<string, 2> = useMemo(() => {
    const month = date.getMonth();
    return [months[month], months[month === 11 ? 0 : month + 1]];
  }, [months, date]);

  return isOpen ? (
    <Container>
      <Header months={currentMonths} onNext={onNext} onPrevious={onPrevious} />
      <Days date={date} />
    </Container>
  ) : (
    <></>
  );
};

export default DatePicker;
