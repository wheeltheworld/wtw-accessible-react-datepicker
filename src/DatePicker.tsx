import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import {
  months as defaultMonths,
  days as defaultDays,
  styles as defaultStyles,
} from "./utils/defaults";
import Header from "./Header";
import { StyleConfig } from "./types/StyleConfig";
import { SelectedDates } from "./types/SelectedDates";
import { Tuple } from "./types/Tuple";
import { useDateSelector } from "./utils/hooks/useDateSelector";
import FocusTrap from "focus-trap-react";
import { useOnClickOutside } from "./utils/hooks/useOnClickOutside";
import { generateDay } from "./utils/funcs/generateDay";
import { Day } from "./types/Day";
import { useWindowSize } from "./utils/hooks/useWindowSize";
import { datepickerCtx } from "./utils/ctx";

const Container = styled.div<{
  background: string;
  custom?: string;
  font: string;
  fullScreen: boolean;
}>`
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid black;
  padding 17px 25px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ background }) => background};

  ${({ fullScreen }) =>
    fullScreen &&
    `
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  
  `}
  
  & > * {
    font-family: ${({ font }) => font};
  }
  ${({ custom }) => custom || ""}
  `;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 40px;
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
  value?: SelectedDates;
  onChange?: (val: SelectedDates) => void;
  styles?: StyleConfig;
  months?: Tuple<string, 12>;
  days?: Tuple<string, 7>;
  minDate?: Day | "today" | null;
  maxDate?: Day | "today" | null;
  multipleSelect?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  handleToggle,
  minDate,
  maxDate,
  value,
  onChange,
  months = defaultMonths,
  days = defaultDays,
  styles = defaultStyles,
  multipleSelect = true,
}) => {
  const window = useWindowSize();

  const isMobile = (window.width || 757) < 756;

  const isMultiple = !isMobile && multipleSelect;

  const {
    selected,
    addDate,
    hovered,
    setHovered,
    focusable,
    setFocusable,
    force,
  } = useDateSelector(value, multipleSelect);

  useEffect(() => {
    if (value) force(value);
  }, [value]);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const [date, setDate] = useState(
    selected[0] ? selected[0] : generateDay(new Date())
  );
  const onNext = () =>
    setDate(generateDay(new Date(date.year, date.month + 1, date.day)));

  const onPrevious = () =>
    setDate(generateDay(new Date(date.year, date.month - 1, date.day)));

  const currentMonths = useMemo((): Tuple<string, 2 | 1> => {
    const { month, year } = date;
    const monthOne = `${months[month]} ${year}`;
    const monthTwo = `${months[month === 11 ? 0 : month + 1]} ${year}`;
    if (isMultiple) {
      return [monthOne, monthTwo];
    }
    return [monthOne];
  }, [months, date, isMultiple]);

  const secondDate = useMemo(
    () => generateDay(new Date(date.year, date.month + 1, date.day)),
    [date]
  );
  const datepicker = useRef<HTMLDivElement>(null);

  useOnClickOutside(datepicker, () => {
    handleToggle();
  });

  const actualMaxDate = useMemo(
    () =>
      maxDate
        ? maxDate === "today"
          ? generateDay(new Date())
          : maxDate
        : null,
    [maxDate]
  );
  const actualMinDate = useMemo(
    () =>
      minDate
        ? minDate === "today"
          ? generateDay(new Date())
          : minDate
        : null,
    [minDate]
  );

  return isOpen ? (
    <datepickerCtx.Provider
      value={{
        styles,
        months,
        days,
        maxDate: actualMaxDate,
        minDate: actualMinDate,
        onSelect: addDate,
        selected: selected,
        hover: hovered,
        setHover: setHovered,
        focusable: focusable,
        setFocusable: setFocusable,
        isMultiple: multipleSelect,
      }}
    >
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <Container
          role='dialog'
          background={styles.background}
          font={styles.font}
          custom={styles.custom}
          ref={datepicker}
          fullScreen={isMobile}
        >
          <Header
            months={currentMonths}
            onNext={onNext}
            onPrevious={onPrevious}
          />
          <Flex>
            <Calendar date={date} />
            {isMultiple && <Calendar date={secondDate} />}
          </Flex>
          <Close onClick={handleToggle}>Close</Close>
        </Container>
      </FocusTrap>
    </datepickerCtx.Provider>
  ) : null;
};

export default DatePicker;
