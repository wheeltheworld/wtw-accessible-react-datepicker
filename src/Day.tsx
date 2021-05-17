import React, { useMemo } from "react";
import styled from "styled-components";
import { Day as IDay } from "./types/Day";
import { generateButtonId } from "./utils/funcs/generateButtonId";
import { isBetween } from "./utils/funcs/isBetween";
import { isSelected } from "./utils/funcs/isSelected";
import { StyleConfig } from "./types/StyleConfig";
import { Tuple } from "./types/Tuple";

const Circle = styled.div<{
  selected?: boolean;
  disabled?: boolean;
  styles: StyleConfig;
}>`
  border: none;
  color: ${({ styles }) => styles.normal};
  background: none;
  border-radius: 100%;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-weight: 600;
  border: 1px solid transparent;

  ${({ disabled, styles }) =>
    disabled
      ? `
      color: ${styles.disabled};
      text-decoration: line-through;

      `
      : `&:hover {
        border: 1px solid ${styles.selected};
      }`}

  ${({ selected, styles, disabled }) =>
    disabled
      ? ""
      : selected
      ? `
         background-color: ${styles.selected};
         color: white;
      `
      : ""};
`;

const DayContainer = styled.div<{
  selected?: boolean;
  right?: boolean;
  between?: boolean;
  disabled: boolean;
  color: string;
}>`
  ${({ selected, right, color, disabled }) =>
    disabled
      ? ""
      : selected
      ? `
    background: linear-gradient(${
      right ? "" : "-"
    }90deg, ${color} 0%, ${color} 50%, white 50%, white 100%);
`
      : ""}

  ${({ between, color, disabled }) =>
    disabled
      ? ""
      : between
      ? `
    background-color: ${color} ;
    border-radius: 0;
  `
      : ""}
`;

const Clickable = styled.button<{ selected: boolean; color: string }>`
  background: none;
  border: none;
  height: 100%;
  padding: 3.5px 0;
  outline: none;
  cursor: pointer;

  ${({ selected, color }) =>
    !selected
      ? `&:focus .day {
        border: 1px solid ${color};
  }`
      : ``}
`;

interface DayProps {
  day: number;
  month: number;
  year: number;
  focusable: string;
  hover: IDay | null;
  selected: Tuple<IDay | null, 2>;
  onSelect: (day: IDay) => void;
  handleKey: (e: React.KeyboardEvent<HTMLButtonElement>, day: number) => void;
  setHover: (day: IDay | null) => void;
  setFocusable: (id: string) => void;
  months: Tuple<string, 12>;
  styles: StyleConfig;
  minDate?: Date;
  maxDate?: Date;
}

const Day: React.FC<DayProps> = ({
  day,
  month,
  year,
  selected,
  hover,
  focusable,
  onSelect,
  setHover,
  handleKey,
  months,
  setFocusable,
  styles,
  minDate,
  maxDate,
}) => {
  const curr = useMemo(
    () => ({
      day,
      month,
      year,
    }),
    []
  );
  const disabled = useMemo(() => {
    if (minDate) {
      if (minDate > new Date(year, month, day)) return true;
    }
    if (maxDate) {
      if (maxDate < new Date(year, month, day)) return true;
    }

    return false;
  }, [minDate, maxDate]);

  const [isDaySelected, isRightHover] = useMemo(
    () => isSelected(selected, curr),
    [selected]
  );
  const [isDayHovered, isRight] = useMemo(
    () => isSelected([selected[0], hover], curr),
    [selected, hover]
  );
  const isDayBetween = useMemo(
    () =>
      isBetween(selected, curr) ||
      (!selected[1] && isBetween([selected[0], hover], curr)),
    [selected, hover]
  );
  const id = useMemo(() => generateButtonId(curr), []);

  if (day === -1) return <div></div>;

  return (
    <Clickable
      onClick={() => {
        onSelect(curr);
        setFocusable(id);
      }}
      onMouseOver={() => setHover(curr)}
      onMouseOut={() => setHover(null)}
      onBlur={() => setHover(null)}
      onFocus={() => setHover(curr)}
      aria-label={`${months[month]} ${day} ${year}`}
      tabIndex={focusable === id ? 0 : -1}
      onKeyDown={(e) => {
        handleKey(e, day);
      }}
      disabled={disabled}
      selected={
        isDaySelected || (!!selected[0] && !selected[1] && isDayHovered)
      }
      id={generateButtonId({ day, month, year })}
      color={styles.selected}
      type='button'
    >
      <DayContainer
        disabled={disabled}
        key={day}
        selected={
          (isDaySelected && (!!selected[1] || !!hover)) ||
          (!isDaySelected && !!selected[0] && !selected[1] && isDayHovered)
        }
        right={isRight || isRightHover}
        between={isDayBetween}
        color={styles.between}
      >
        <Circle
          selected={
            isDaySelected || (!!selected[0] && !selected[1] && isDayHovered)
          }
          disabled={disabled}
          className='day'
          styles={styles}
        >
          {day}
        </Circle>
      </DayContainer>
    </Clickable>
  );
};

export default Day;
