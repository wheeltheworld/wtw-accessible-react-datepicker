import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Calendar from './Calendar';
import { months as defaultMonths, days as defaultDays, styles as defaultStyles } from './utils/defaults';
import Header from './Header';
import { StyleConfig } from './types/StyleConfig';
import { SelectedDates } from './types/SelectedDates';
import { Tuple } from './types/Tuple';
import { useDateSelector } from './utils/hooks/useDateSelector';
import FocusTrap from 'focus-trap-react';
import { useOnClickOutside } from './utils/hooks/useOnClickOutside';
import { generateDay } from './utils/funcs/generateDay';
import { Day } from './types/Day';
import { useWindowSize } from './utils/hooks/useWindowSize';
import { datepickerCtx } from './utils/ctx';
import { generateButtonId } from './utils/funcs/generateButtonId';

const Container = styled.div<{
    background: string;
    custom?: StyleConfig['custom'];
    font: string;
    fullScreen: boolean;
}>`
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid black;
    padding: 17px 25px;
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: ${({ background }) => background};

    ${({ fullScreen }) =>
        fullScreen &&
        `
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid black;
  padding: 17px 25px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  
  `}

    & > * {
        font-family: ${({ font }) => font};
    }
    ${({ custom, fullScreen }) => (custom ? (typeof custom === 'string' ? custom : custom(fullScreen)) : '')}
`;

const Flex = styled.div<{ flexDirection?: string; justifyContent?: string; columnGap?: string }>`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
    justify-content: ${({ justifyContent }) => justifyContent};
    column-gap: ${({ columnGap }) => columnGap}; ;
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

const Clear = styled.button`
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
    align-self: flex-end;
    font-size: 16px;
    font-weight: bold;
    color: #007a87;
`;

const Save = styled.button`
    background: #232323;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 9px 25px;
    color: white;
    border-radius: 100px;
    font-weight: 800;
    font-size: 1rem;
`;

export interface DatePickerProps {
    isOpen: boolean;
    handleToggle: () => void;
    value?: SelectedDates;
    onChange?: (val: SelectedDates) => void;
    styles?: StyleConfig;
    months?: Tuple<string, 12>;
    days?: Tuple<string, 7>;
    minDate?: Day | 'today' | null;
    maxDate?: Day | 'today' | null;
    multipleSelect?: boolean;
    autoClose?: boolean;
    showClose?: boolean;
    showSave?: boolean;
    showCleanDates?: boolean;
    buttonsLabels?: { closeLabel?: string; saveLabel?: string; clearLabel?: string };
    calendarOrientation?: 'horizontal' | 'vertical';
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    isOpen,
    handleToggle,
    minDate,
    maxDate,
    value,
    showClose = false,
    onChange,
    months = defaultMonths,
    days = defaultDays,
    styles = defaultStyles,
    autoClose = true,
    multipleSelect = true,
    showSave = false,
    showCleanDates = true,
    label = 'Select dates',
    buttonsLabels = { closeLabel: 'Close', saveLabel: 'Save', clearLabel: 'Clear dates' },
    calendarOrientation = 'horizontal',
}) => {
    const window = useWindowSize();

    const isMobile = (window.width || 757) < 756;

    const isMultiple = !isMobile && multipleSelect;

    const { selected, addDate, hovered, setHovered, focusable, setFocusable, force, clearDates } = useDateSelector(
        value,
        multipleSelect,
    );

    const handleClose = () => {
        if (multipleSelect && selected[1]) {
            handleToggle();
        } else if (!multipleSelect && selected[0] !== null) {
            handleToggle();
        }
    };

    useEffect(() => {
        if (value) force(value);
    }, [value]);

    useEffect(() => {
        if (onChange) onChange(selected);
        if (autoClose) handleClose();
    }, [selected]);

    const [date, setDate] = useState(selected[0] ? selected[0] : generateDay(new Date()));
    const onNext = (id?: string) => {
        const day = generateDay(new Date(date.year, date.month, 1));

        if (id) {
            setFocusable(id);
        } else {
            setFocusable(generateButtonId(day));
        }

        setDate(day);
    };

    const onPrevious = (id?: string) => {
        const day = generateDay(new Date(date.year, date.month - 2, 1));
        if (id) {
            setFocusable(id);
        } else {
            setFocusable(generateButtonId(day));
        }

        setDate(day);
    };

    const currentMonths = useMemo((): Tuple<string, 2 | 1> => {
        const { month, year } = date;
        const monthOne = `${months[month - 1]} ${year}`;
        const monthTwo = `${months[month === 12 ? 0 : month]} ${month === 12 ? year + 1 : year}`;
        if (isMultiple) {
            return [monthOne, monthTwo];
        }

        return [monthOne];
    }, [months, date, isMultiple]);

    const secondDate = useMemo(() => generateDay(new Date(date.year, date.month, 1)), [date]);
    const datepicker = useRef<HTMLDivElement>(null);

    useOnClickOutside(datepicker, () => {
        handleToggle();
    });

    const actualMaxDate = useMemo(
        () => (maxDate ? (maxDate === 'today' ? generateDay(new Date()) : maxDate) : null),
        [maxDate],
    );
    const actualMinDate = useMemo(
        () => (minDate ? (minDate === 'today' ? generateDay(new Date()) : minDate) : null),
        [minDate],
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
                selected,
                hover: hovered,
                setHover: setHovered,
                focusable,
                setFocusable,
                isMultiple: multipleSelect,
                onPrevious,
                onNext,
            }}
        >
            <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
                <Container
                    role="dialog"
                    background={styles.background}
                    font={styles.font}
                    custom={styles.custom}
                    ref={datepicker}
                    fullScreen={isMobile}
                >
                    <Header calendarOrientation={calendarOrientation} label={label} months={currentMonths} />
                    <Flex
                        columnGap="40px"
                        justifyContent="center"
                        flexDirection={calendarOrientation === 'horizontal' ? 'row' : 'column'}
                    >
                        <Calendar
                            calendarOrientation={calendarOrientation}
                            date={date}
                            currentMonths={currentMonths}
                            monthIndex={0}
                        />
                        {isMultiple && (
                            <Calendar
                                calendarOrientation={calendarOrientation}
                                date={secondDate}
                                currentMonths={currentMonths}
                                monthIndex={1}
                            />
                        )}
                    </Flex>
                    <Flex justifyContent="space-between">
                        {showClose && (
                            <Close onClick={() => handleToggle()}>{buttonsLabels.closeLabel || 'Close'}</Close>
                        )}
                        {showCleanDates && (
                            <Clear type="button" onClick={() => clearDates()}>
                                {buttonsLabels.clearLabel || 'Clear dates'}
                            </Clear>
                        )}
                        {showSave && (
                            <Save type="button" onClick={() => handleToggle()}>
                                {buttonsLabels.saveLabel || 'Save'}
                            </Save>
                        )}
                    </Flex>
                </Container>
            </FocusTrap>
        </datepickerCtx.Provider>
    ) : null;
};

export default DatePicker;
