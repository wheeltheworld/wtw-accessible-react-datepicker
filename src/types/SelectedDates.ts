import { useDateSelector } from '../utils/hooks/useDateSelector';

export type SelectedDates = ReturnType<typeof useDateSelector>['selected'];
