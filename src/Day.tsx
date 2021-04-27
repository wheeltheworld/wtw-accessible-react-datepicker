import React, { useMemo } from "react";
import styled from "styled-components";
import { Day as IDay, Tuple } from "./types";
import { generateButtonId } from "./utils/funcs/generateButtonId";
import { isBetween } from "./utils/funcs/isBetween";
import { isSelected } from "./utils/funcs/isSelected";

const Circle = styled.div<{
  selected?: boolean;
  disabled?: boolean;
}>`
  border: none;
  color: #232323;
  background: none;
  border-radius: 100%;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-weight: 600;
  border: 1px solid transparent;

  ${({ disabled }) =>
    disabled
      ? `
      color: #949494;

      `
      : `&:hover {
        border: 1px solid #2f6fe4;
      }`}

  ${({ selected }) =>
    selected
      ? `
         background-color: #2F6FE4;
         color: white;
      `
      : ""};
`;

const DayContainer = styled.div<{
  selected?: boolean;
  right?: boolean;
  between?: boolean;
}>`
  ${({ selected, right }) =>
    selected
      ? `
    background: linear-gradient(${
      right ? "" : "-"
    }90deg, #D5E2FA 0%, #D5E2FA 50%, white 50%, white 100%);
`
      : ""}

  ${({ between }) =>
    between
      ? `
    background-color: #D5E2FA; 
    border-radius: 0;
  `
      : ""}
`;

const Clickable = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  height: 100%;
  padding: 3.5px 0;
  outline: none;
  cursor: pointer;

  ${({ selected }) =>
    !selected
      ? `&:focus .day {
        border: 1px solid #2f6fe4;
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
}) => {
  const curr = useMemo(
    () => ({
      day,
      month,
      year,
    }),
    []
  );
  const disabled = useMemo(
    () => new Date(year, month, day + 1) < new Date(),
    []
  );

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
    >
      <DayContainer
        key={day}
        selected={
          (isDaySelected && (!!selected[1] || !!hover)) ||
          (!isDaySelected && !!selected[0] && !selected[1] && isDayHovered)
        }
        right={isRight || isRightHover}
        between={isDayBetween}
      >
        <Circle
          selected={
            isDaySelected || (!!selected[0] && !selected[1] && isDayHovered)
          }
          disabled={disabled}
          className='day'
        >
          {day}
        </Circle>
      </DayContainer>
    </Clickable>
  );
};

export default Day;
