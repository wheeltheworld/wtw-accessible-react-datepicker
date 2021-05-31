import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import { months as defaultMonths, days as defaultDays } from "./utils/defaults";
import Header from "./Header";
import { StyleConfig } from "./types/StyleConfig";
import { SelectedDates } from "./types/SelectedDates";
import { Tuple } from "./types/Tuple";
import { useDateSelector } from "./utils/hooks/useDateSelector";
import FocusTrap from "focus-trap-react";
import { useOnClickOutside } from "./utils/hooks/useOnClickOutside";
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
  styles: StyleConfig;
  months?: Tuple<string, 12>;
  days?: Tuple<string, 7>;
  minDate?: Date;
  maxDate?: Date;
  showClose?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  handleToggle,
  styles,
  minDate,
  maxDate,
  value,
  showClose = true,
  onChange,
  ...props
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
  const datepicker = useRef<HTMLDivElement>(null);
  useOnClickOutside(datepicker, () => {
    handleToggle();
  });

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
          <Calendar
            date={date}
            {...commonCalendar}
            styles={styles}
            days={days}
            minDate={minDate}
            maxDate={maxDate}
          />
          <Calendar
            date={secondDate}
            {...commonCalendar}
            styles={styles}
            days={days}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Flex>
        {showClose && <Close onClick={() => handleToggle()}>Close</Close>}
      </Container>
    </FocusTrap>
  ) : (
    <> </>
  );
};

export default DatePicker;
