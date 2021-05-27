import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
const Container = styled.div<{
  background: string;
  custom?: string;
  font: string;
}>`
  border-radius: 10px;
  border: 1px solid black;
  padding 17px 25px;
  display: flex;
  flex-direction: column;
  width: 700px;
  position: absolute;
  background-color: ${({ background }) => background};
  
  & > * {
    font-family: ${({ font }) => font};
  }
  ${({ custom }) => custom || ""}
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
  value?: SelectedDates;
  onChange?: (val: SelectedDates) => void;
  styles?: StyleConfig;
  months?: Tuple<string, 12>;
  days?: Tuple<string, 7>;
  minDate?: Day | "today" | null;
  maxDate?: Day | "today" | null;
}

export const datepickerCtx = createContext<
  Required<Pick<DatePickerProps, "days" | "months" | "styles">> & {
    minDate: Day | null;
    maxDate: Day | null;
    selected: SelectedDates;
  }
>({
  minDate: null,
  maxDate: null,
  days: defaultDays,
  months: defaultMonths,
  styles: defaultStyles,
  selected: [null, null],
});

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
}) => {
  const {
    selected,
    addDate,
    hovered,
    setHovered,
    focusable,
    setFocusable,
    force,
  } = useDateSelector(value);

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

  const currentMonths = useMemo((): Tuple<string, 2> => {
    const { month, year } = date;
    return [
      `${months[month]} ${year}`,
      `${months[month === 11 ? 0 : month + 1]} ${year}`,
    ];
  }, [months, date]);

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
      }}
    >
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <Container
          role='dialog'
          background={styles.background}
          font={styles.font}
          custom={styles.custom}
          ref={datepicker}
        >
          <Header
            months={currentMonths}
            onNext={onNext}
            onPrevious={onPrevious}
          />
          <Flex>
            <Calendar date={date} />
            <Calendar date={secondDate} />
          </Flex>
          <Close onClick={handleToggle}>Close</Close>
        </Container>
      </FocusTrap>
    </datepickerCtx.Provider>
  ) : (
    <> </>
  );
};

export default DatePicker;
