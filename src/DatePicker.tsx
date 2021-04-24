import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Days from "./Days";
import { months as defaultMonths } from "./utils/defaults";
import Header from "./Header";
import { Tuple } from "./types";
import { useDateSelector } from "./utils/hooks/useDateSelector";

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid black;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [_selected, addDate] = useDateSelector();

  const onNext = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  }, [date]);

  const onPrevious = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  }, [date]);

  const months = useMemo(() => props.months || defaultMonths, [props.months]);

  const currentMonths = useMemo((): Tuple<string, 2> => {
    const month = date.getMonth();
    return [
      months[month] + date.getFullYear(),
      months[month === 11 ? 0 : month + 1] + date.getFullYear(),
    ];
  }, [months, date]);

  const secondDate = useMemo(
    () => new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    [date]
  );
  return isOpen ? (
    <Container>
      <Header months={currentMonths} onNext={onNext} onPrevious={onPrevious} />
      <Flex>
        <Days date={date} onSelect={addDate} />
        <Days date={secondDate} onSelect={addDate} />
      </Flex>
    </Container>
  ) : (
    <></>
  );
};

export default DatePicker;
