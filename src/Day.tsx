import React, { useContext, useMemo } from 'react';
import styled from '@emotion/styled';
import { Day as IDay } from './types/Day';
import { generateButtonId } from './utils/funcs/generateButtonId';
import { isBetween } from './utils/funcs/isBetween';
import { isSelected } from './utils/funcs/isSelected';
import { StyleConfig } from './types/StyleConfig';
import { dayIsSooner } from './utils/funcs/dayIsSooner';
import { datepickerCtx } from './utils/ctx';

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
      font-style: italic;

      `
            : `&:hover {
        border: 1px solid ${styles.selected};
      }`}

    ${({ selected, styles, disabled }) =>
        disabled
            ? ''
            : selected
            ? `
         background-color: ${styles.selected};
         color: white;
      `
            : ''};
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
            ? ''
            : selected
            ? `
    background: linear-gradient(${right ? '' : '-'}90deg, ${color} 0%, ${color} 50%, white 50%, white 100%);
`
            : ''}

    ${({ between, color, disabled }) =>
        disabled
            ? ''
            : between
            ? `
    background-color: ${color} ;
    border-radius: 0;
  `
            : ''}
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
    day: IDay;
    handleKey: (e: React.KeyboardEvent<HTMLButtonElement>, day: number) => void;
}

const Day: React.FC<DayProps> = ({ day, handleKey }) => {
    const {
        months,
        styles,
        maxDate,
        minDate,
        selected,
        hover,
        focusable,
        onSelect,
        setHover,
        setFocusable,
        isMultiple,
    } = useContext(datepickerCtx);

    const disabled = !!((minDate && dayIsSooner(day, minDate)) || (maxDate && dayIsSooner(maxDate, day)));

    const [isDaySelected, isRight] = isSelected(selected, day);
    const [isDayHovered, isRightHover] = isSelected([selected[0], hover], day);

    const isDayBetween = isBetween(selected, day) || (!selected[1] && isBetween([selected[0], hover], day));

    const id = useMemo(() => generateButtonId(day), []);

    if (day.day === -1) return <span></span>;

    return (
        <Clickable
            onClick={() => {
                onSelect(day);
                setFocusable(id);
            }}
            onMouseOver={() => setHover(day)}
            onMouseOut={() => setHover(null)}
            onBlur={() => setHover(null)}
            onFocus={() => setHover(day)}
            aria-label={`${months[day.month - 1]} ${day.day} ${day.year}`}
            tabIndex={focusable === id ? 0 : -1}
            onKeyDown={(e) => {
                handleKey(e, day.day);
            }}
            disabled={disabled}
            selected={(isDaySelected || (!!selected[0] && !selected[1] && isDayHovered)) && isMultiple}
            id={generateButtonId(day)}
            color={styles.selected}
            type="button"
        >
            <DayContainer
                disabled={disabled}
                selected={
                    ((isDaySelected && (!!selected[1] || !!hover)) ||
                        (!isDaySelected && !!selected[0] && !selected[1] && isDayHovered)) &&
                    isMultiple
                }
                right={isRight || isRightHover}
                between={isDayBetween && isMultiple}
                color={styles.between}
            >
                <Circle
                    selected={isDaySelected || (!!selected[0] && !selected[1] && isDayHovered && isMultiple)}
                    disabled={disabled}
                    className="day"
                    styles={styles}
                >
                    {day.day}
                </Circle>
            </DayContainer>
        </Clickable>
    );
};

export default Day;
