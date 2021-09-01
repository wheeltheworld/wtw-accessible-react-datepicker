import { Day } from '../../types/Day';
import { SelectedDates } from '../../types/SelectedDates';

export const isSelected = (selected: SelectedDates, { day, month, year }: Day) => {
    if (selected[0]?.day === day && selected[0]?.month === month && selected[0]?.year === year) return [true, false];
    if (selected[1]?.day === day && selected[1]?.month === month && selected[1]?.year === year) return [true, true];

    return [false, false];
};
